import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';

Template.Study_Session_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */
  sessionsList() {
    return Sessions.find();
  },

  search() {
    // Get the search value that was submitted.
    let searchValue = Session.get("searchValue");
    // Search the Sessions collection for any sessions with the same name as searchValue and return it.
    if(searchValue){
    return Sessions.find({ course: searchValue});}
    else{
      return  Sessions.find();
    }
  }
});

Template.Study_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
  });

});

Template.Study_Session_Page.events({
  "submit #search": function (e) {
    e.preventDefault();
    Session.set("searchValue", $("#searchValue").val());

  }
});
