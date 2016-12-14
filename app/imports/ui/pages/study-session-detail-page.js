import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Users } from '../../api/users/users.js';

Template.Study_Session_Detail_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
    this.subscribe('Users');
  });
});

Template.Study_Session_Detail_Page.helpers({
  findSession(){
    return Sessions.findOne(FlowRouter.getParam('_id'));
  },
  getDuration(session){
    return session.endV - session.startV;
  },
  hasJoined(){
    const guestListPros = Sessions.findOne(FlowRouter.getParam('_id')).guestsPros;
    const guestListStuds = Sessions.findOne(FlowRouter.getParam('_id')).guestsStuds;
    if ((_.contains(guestListPros, Meteor.user().profile.name)) || (_.contains(guestListStuds, Meteor.user().profile.name))) {
      return true;
    }
    return false;
  },
  isCreator(){
    if (Sessions.findOne(FlowRouter.getParam('_id')).name == Meteor.user().profile.name) {
      return true;
    }
    return false;
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Study_Session_Detail_Page.events({
  'submit .add'(event){
    event.preventDefault();
    console.log("topic: " + event.target.topic.value);
    Sessions.update(
        { _id: FlowRouter.getParam('_id') },
        { $push: { topic: event.target.topic.value}  });
    FlowRouter.reload();
  },
  'click .join-pro'(event){
    event.preventDefault();
    const guestList = Sessions.findOne(FlowRouter.getParam('_id')).guestsPros;
    if(_.contains(guestList, Meteor.user().profile.name) == false) {
      Sessions.update(
          { _id: FlowRouter.getParam('_id') },
          { $push: { guestsPros: Meteor.user().profile.name}  });
      FlowRouter.reload();
    } else {
      console.log("Already in list");
    }
  },
  'click .join-stud'(event){
    event.preventDefault();
    const guestList = Sessions.findOne(FlowRouter.getParam('_id')).guestsStuds;
    if(_.contains(guestList, Meteor.user().profile.name) == false) {
      Sessions.update(
          { _id: FlowRouter.getParam('_id') },
          { $push: { guestsStuds: Meteor.user().profile.name}  });
      FlowRouter.reload();
    } else {
      console.log("Already in list");
    }
  },
  'click .leave'(event){
    event.preventDefault();
    const guestListPros = Sessions.findOne(FlowRouter.getParam('_id')).guestsPros;
    const guestListStuds = Sessions.findOne(FlowRouter.getParam('_id')).guestsStuds;
    if (_.contains(guestListPros, Meteor.user().profile.name)) {
      Sessions.update(
          { _id: FlowRouter.getParam('_id') },
          { $pull: { guestsPros: Meteor.user().profile.name } });
      FlowRouter.reload();
    } else
      if (_.contains(guestListStuds, Meteor.user().profile.name)) {
        Sessions.update(
            { _id: FlowRouter.getParam('_id') },
            { $pull: { guestsStuds: Meteor.user().profile.name } });
        FlowRouter.reload();
      } else {
        console.log("You didn't even join weirdo");
      }
  },
  'click .delete'(event){
    event.preventDefault();
    Sessions.remove(FlowRouter.getParam('_id'));
    FlowRouter.go('Calendar_Page');
  }
});