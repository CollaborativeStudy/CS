import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';
import { Users } from '../../api/users/users.js';

Template.Study_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
    this.subscribe('Users');
  });
});

Template.Study_Session_Page.helpers({
  sessionsList() {
    return Sessions.find();
  },

  /*  Function name:    search
   *
   *  Description:      Get the searchValue from the form submission. Search the Sessions collection for courses,
   *                    titles, or topics matching the given search string. Search is case insensitive and also searches
   *                    partial strings.
   *
   *  Parameters:       None
   *
   *  Return values:    Cursor to all Sessions matching the search criteria.
   */
  search() {
    // Get the search value that was submitted.
    let searchValue = Session.get("searchValue");
    let searchResult = Sessions.find();

    // Search the Sessions collection for any sessions with the same course, title, or topic.
      return Sessions.find({ $or: [ { course: new RegExp(searchValue, 'i') }, { title: new RegExp(searchValue, 'i') }, { topic: new RegExp(searchValue, 'i') } ] } );
  },

  /*  Function name:    hasTutorial
   *
   *  Description:      Checks if the current user has tutorial mode enabled.
   *
   *  Parameters:       None
   *
   *  Return values:    boolean:  true - user tutorial enabled
   *                              false - user tutorial disabled
   */
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Study_Session_Page.events({
  'submit #search': function (e) {
    e.preventDefault();
    Session.set("searchValue", $("#searchValue").val());
  },
  'click .reset'(event){
    event.preventDefault();
    Session.set("searchValue", "");
    FlowRouter.reload();
  }
});
