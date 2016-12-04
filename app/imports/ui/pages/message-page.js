import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Messages} from '../../api/reviews/messages.js';

Template.Review_Page.helpers({

  /**
   * @returns {*} All of the Reviews documents.
   */
  messagesList() {
    return Messages.find();
  },
});

Template.Message_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Messages');
  });

});

if (Meteor.isClient) {
  Template.messages.helpers({
    messages: function() {
      return Messages.find({}, { sort: { time: -1}});
    }
  });
  Template.input.events = {
    'keydown input#message' : function (event) {
      if (event.which == 13 || event.button) { // 13 is the enter key event
        var name = 'Anon';
        var message = document.getElementById('message');
        var time = Date.now();

        console.log('Name = ' + name);
        console.log('Message = ' + message);
        console.log('Time = ' + time);

        if (message.value != '') {
          Messages.insert({ name, message, time});
          document.getElementById('message').value = '';
          message.value = '';
        }
      }
    }
  }
}