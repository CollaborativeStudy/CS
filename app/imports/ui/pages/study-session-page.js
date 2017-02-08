import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';
import { Users } from '../../api/users/users.js';

/*
 *  Name:         onCreated: Study_Session_Page
 *
 *  Description:  Subscribe to "Sessions" and "Users" collections.
 */
Template.Study_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
    this.subscribe('Users');
  });
});

/*
 *  Name:         onRendered: Study_Session_Page
 *
 *  Description:  Enable Semantic UI dropdown.
 */
Template.Study_Session_Page.onRendered(function enableSemantic() {
  this.$('.ui.dropdown').dropdown();
});


Template.Study_Session_Page.helpers({
  /*
   *  Function name:    sessionsList
   *
   *  Description:      Get a cursor for all of the Sessions in the Sessions collection.
   *
   *  Parameters:       None
   *
   *  Return values:    Cursor to all Sessions.
   */
  sessionsList() {
    return Sessions.find();
  },

  /*
   *  Function name:    search
   *
   *  Description:      Get the searchValue from the form submission. Search the Sessions collection for courses,
   *                    titles, or topics matching the given search string. Search is case insensitive and also searches
   *                    partial strings. Returns all Sessions when given an empty string.
   *
   *  Parameters:       None
   *
   *  Input:            searchValue: string from the form submission.
   *
   *  Return values:    Cursor to all Sessions matching the search criteria.
   */
  search() {
    // Get the search value that was submitted.
    let searchValue = Session.get("searchValue");

    // Search the Sessions collection for any sessions with the same course, title, or topic.
      return Sessions.find({ $or: [ { course: new RegExp(searchValue, 'i') }, { title: new RegExp(searchValue, 'i') }, { topic: new RegExp(searchValue, 'i') } ] } );
  },

  /*
   *  Function name:    hasTutorial
   *
   *  Description:      Checks if the current user has tutorial mode enabled.
   *
   *  Parameters:       None
   *
   *  Input:            Meteor username/UH username
   *
   *  Return values:    boolean:  true - user tutorial enabled
   *                              false - user tutorial disabled
   */
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Study_Session_Page.events({
  /*
   *  Description:  Executes when the user presses the "Search" button. Receives the submitted search value and stores it
   *  in the current Session.
   */
  'submit #search': function (e) {
    e.preventDefault();
    Session.set("searchValue", $("#searchValue").val());
  },
  /*
   *  Description:  Executes when the user presses the "Reset Search" button. Resets the search, by searching for an
   *                empty string, which will return all Sessions.
   */
  'click .reset'(event){
    event.preventDefault();
    Session.set("searchValue", "");
    FlowRouter.reload();
  }
});
