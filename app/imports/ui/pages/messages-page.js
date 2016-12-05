import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Messages, MessagesSchema} from '../../api/messages/messages.js';

Template.Messages_Page.helpers({

  /**
   * @returns {*} All of the Messages documents.
   */
  messagesList() {
    return Messages.find();
  },
});

Template.Messages_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Messages');
  });

});

Template.Messages_Page.events({
  'submit .new-message'(event){
    event.preventDefault();

    const user = Meteor.user().profile.name;
    const message = event.target.message.value;
    const time = new Date();

    const newMessage = { user, message, time };
    // // Clear out any old validation errors.
    // instance.context.resetValidation();
    // // Invoke clean so that newSessionData reflects what will be inserted.
    // MessagesSchema.clean(newMessage);
    Messages.insert(newMessage);

    //clear form
    event.target.text = '';
  }
});

//
// if (Meteor.isClient) {
//   Template.messages.helpers({
//     messages: function() {
//       return Messages.find({}, { sort: { time: -1}});
//     }
//   });
//   Template.input.events = {
//     'keydown input#message' : function (event) {
//       if (event.which == 13 || event.button) { // 13 is the enter key event
//         var name = 'Anon';
//         var message = document.getElementById('message');
//         var time = Date.now();
//
//         console.log('Name = ' + name);
//         console.log('Message = ' + message);
//         console.log('Time = ' + time);
//
//         if (message.value != '') {
//           Messages.insert({ name, message, time});
//           document.getElementById('message').value = '';
//           message.value = '';
//         }
//       }
//     }
//   }
// }