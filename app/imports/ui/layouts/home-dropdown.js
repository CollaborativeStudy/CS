import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Header.events({
  'click .home-my-calendar'(event) {
    event.preventDefault();
    FlowRouter.go('Calendar_Page');
  },

  'click .home-notifications'(event) {
    event.preventDefault();
    FlowRouter.go('Notifications_Page');
  },

  'click .home-groups'(event) {
    event.preventDefault();
    FlowRouter.go('Group_Page');
  },

  'click .home-messages'(event) {
    event.preventDefault();
    FlowRouter.go('Messages_Page');
  },

  'click .home-reports'(event) {
    event.preventDefault();
    FlowRouter.go('Reports_Page');
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();

});
