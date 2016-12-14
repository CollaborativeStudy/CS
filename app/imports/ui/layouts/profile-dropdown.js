import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Users } from '../../api/users/users.js';

Template.Profile_Dropdown.helpers({
  tutorials(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Profile_Dropdown.events({
  'click .my-page'(event) {
    event.preventDefault();
    FlowRouter.go('User_Profile_Page');
    $('.dropdown').dropdown('restore defaults');
  },
  'click .my-calendar'(event) {
    event.preventDefault();
    FlowRouter.go('Calendar_Page');
    $('.dropdown').dropdown('restore defaults');

  },
  'click .groups'(event) {
    event.preventDefault();
    FlowRouter.go('Group_Page');
    $('.dropdown').dropdown('restore defaults');

  },
  'click .tutorials-on'(event) {
    event.preventDefault();
    console.log("meteor: " + Meteor.user().profile.name);
    console.log("all: " + Users.find().fetch);
    console.log(Users.findOne({ username: Meteor.user().profile.name }));
    Users.update(
        { _id: Users.findOne({ username: Meteor.user().profile.name })._id },
        { $set: { tutorial: true  }}
    );
    $('.dropdown').dropdown('restore defaults');
  },
  'click .tutorials-off'(event) {
    event.preventDefault();
    console.log("meteor: " + Meteor.user().profile.name);
    console.log("all: " + Users.find().fetch);
    console.log(Users.findOne({ username: Meteor.user().profile.name }));
    Users.update(
        { _id: Users.findOne({ username: Meteor.user().profile.name })._id },
        { $set: { tutorial: false } }
    );
    $('.dropdown').dropdown('restore defaults');
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Profile_Dropdown.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();

});
