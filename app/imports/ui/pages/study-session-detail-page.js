import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Study_Session_Detail_Page.helpers({
  findSession(){
    return Sessions.findOne(FlowRouter.getParam('_id'));
  },
  getDuration(session){
    return session.endV - session.startV;
  }
});

Template.Study_Session_Detail_Page.events({
  'click .delete'(event, instance){
    event.preventDefault();
    Sessions.remove(FlowRouter.getParam('_id'));
    FlowRouter.go('Calendar_Page');
  }
});