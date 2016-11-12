import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';

Template.Test_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
  });
});

Template.Test_Page.helpers({

  /**
   * @returns {*} All of the Sessions documents.
   */
  sessionsList() {
    return Sessions.find();
  },
});
