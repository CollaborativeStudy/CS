import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Users } from '../../api/users/users.js';

Template.Header.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Users');
  });
});

Template.Header.helpers({
  isAdmin(){
    return Users.findOne({ username: Meteor.user().profile.name }).admin;
  }
});