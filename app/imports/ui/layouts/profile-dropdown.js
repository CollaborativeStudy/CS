import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Profile_Dropdown.events({
  'click .my-page'(event) {
    event.preventDefault();
    FlowRouter.go('User_Profile_Page');
  },

  'click .my-calendar'(event) {
    event.preventDefault();
    FlowRouter.go('Calendar_Page');
  },

  'click .notifications'(event) {
    event.preventDefault();
    FlowRouter.go('Notifications_Page');
  },

  'click .groups'(event) {
    event.preventDefault();
    FlowRouter.go('Group_Page');
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Profile_Dropdown.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();

});
