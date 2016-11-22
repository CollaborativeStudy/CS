import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';

Template.Study_Session_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */
  sessionsList() {
    return Sessions.find();
  },
});

Template.Study_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
  });

});