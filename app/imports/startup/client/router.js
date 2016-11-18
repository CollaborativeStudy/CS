import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Used for default home page
FlowRouter.route('/', {
  name: 'Public_Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Public_Landing_Page' });
  },
});

FlowRouter.route('/test', {
  name: 'Test_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Test_Page' });
  },
});

FlowRouter.route('/login', {
  name: 'Login_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Login_Page' });
  },
});

FlowRouter.route('/user-home', {
  name: 'User_Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Home_Page' });
  },
});

FlowRouter.route('/admin-home', {
  name: 'Admin_Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Admin_Home_Page' });
  },
});

FlowRouter.route('/user-profile', {
  name: 'User_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Profile_Page' });
  },
});

FlowRouter.route('/user-profile/:_id', {
  name: 'User_Profile_Detail_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Profile_Detail_Page' });
  },
});

FlowRouter.route('/create-study-session', {
  name: 'Create_Study_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Create_Study_Session_Page' });
  },
});

FlowRouter.route('/study-session', {
  name: 'Study_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Study_Session_Page' });
  },
});

// Use to access detailed study session page.
FlowRouter.route('/study-session/:_id', {
  name: 'Study_Session_Detail_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Study_Session_Detail_Page' });
  },
});

FlowRouter.route('/calendar-page', {
  name: 'Calendar_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Calendar_Page' });
  },
});

FlowRouter.route('/group-page', {
  name: 'Group_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Group_Page' });
  },
});

FlowRouter.route('/group-page-ics314', {
  name: 'Group_Page_Ics314',
  action() {
    BlazeLayout.render('App_Body', { main: 'Group_Page_Ics314' });
  },
});

FlowRouter.route('/group-page-ics311', {
  name: 'Group_Page_Ics311',
  action() {
    BlazeLayout.render('App_Body', { main: 'Group_Page_Ics311' });
  },
});

//Change
FlowRouter.route('/events', {
  name: 'events',
  action() {
    BlazeLayout.render('App_Body', { main: 'events' });
  },
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
