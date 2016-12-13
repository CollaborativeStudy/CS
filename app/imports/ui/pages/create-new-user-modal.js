import {Template} from 'meteor/templating';
import {Users, UsersSchema} from '../../api/users/users.js';
import {_} from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

const displayErrorMessages = 'displayErrorMessages';

Template.Create_New_User_Modal.onRendered(function enableSemantic() {
  this.$('.ui.checkbox').checkbox();
});

Template.Create_New_User_Modal.onCreated(function onCreated() {
  let template = Template.instance().subscribe('Users').ready();
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = UsersSchema.namedContext('Create_New_User_Modal');
})

Template.Create_New_User_Modal.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Create_New_User_Modal.events({
  'submit .new-user'(event, instance) {
    event.preventDefault();
    const name = event.target.name.value;
    const username = Meteor.user().profile.name;
    const profilePicture = event.target.profilePicture.value;
    const terms = document.getElementById('Terms').checked;
    const admin = false;
    const tutorial = true;
    const newUser = { name, username, profilePicture, terms, admin, tutorial }
    instance.context.resetValidation();
    UsersSchema.clean(newUser);
    instance.context.validate(newUser);
    if (instance.context.isValid()) {
      Users.insert(newUser);
      instance.messageFlags.set(displayErrorMessages, false);
      $('#newUser').modal('hide');
      console.log('valid');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
      console.log('invalid');
    }
    // const e = document.getElementById('pros');
    // const f = e.getElementsByTagName('input');
    // const l = _.map(_.filter(f, function(checkbox) { return checkbox.checked == true }), function(checkbox) {return checkbox.value;});
    // const pros = f[0].value;
    // console.log(l);
  },
});