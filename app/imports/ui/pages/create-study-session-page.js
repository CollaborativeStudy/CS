/* import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Sessions, SessionsSchema } from '../../api/sessions/sessions.js'; */

/* eslint-disable no-param-reassign */

/* const displayErrorMessages = 'displayErrorMessages';

Template.Create_Study_Session_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = SessionsSchema.namedContext('Create_Study_Session_Page');
});

Template.Create_Study_Session_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Create_Study_Session_Page.onRendered(function enableSemantic() {
  const instance = this;
  instance.$('select.ui.dropdown').dropdown();
  instance.$('.ui.selection.dropdown').dropdown();
  instance.$('ui.fluid.search.dropdown').dropdown();
});

Template.Create_Study_Session_Page.events({
  'submit .session-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
<<<<<<< HEAD
    const name = 'John Doe changeme';
    const title = event.target.title.value;
=======
    const name = Meteor.user().profile.name;
>>>>>>> master
    const e = document.getElementById(event.target.course.id);
    let course = e.options[e.selectedIndex].text;
    if (course === 'Select a Course') {
      course = '';
    }
    const topic = event.target.topic.value;
    const f = document.getElementById(event.target.startTime.id);
    let startTime = f.options[f.selectedIndex].text;
    if (startTime === 'Select a Start Time') {
      startTime = '';
    }
    const g = document.getElementById(event.target.endTime.id);
    let endTime = g.options[g.selectedIndex].text;
    if (endTime === 'Select an End Time') {
      endTime = '';
    }
    const startTimeV = event.target.startTime.value;
    const endTimeV = event.target.endTime.value;

    const newSession = { name, course, topic, startTime, endTime, startTimeV, endTimeV };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newSession reflects what will be inserted.
    SessionsSchema.clean(newSession);
    // Determine validity.
    instance.context.validate(newSession);
    if (instance.context.isValid()) {
      Sessions.insert(newSession);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Public_Landing_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
}); */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Sessions, SessionsSchema } from '../../api/sessions/sessions.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Create_Study_Session_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = SessionsSchema.namedContext('Create_Study_Session_Page');
});

Template.Create_Study_Session_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Create_Study_Session_Page.onRendered(function enableSemantic() {
  const instance = this;
  instance.$('select.ui.dropdown').dropdown();
  instance.$('.ui.selection.dropdown').dropdown();
  instance.$('ui.fluid.search.dropdown').dropdown();
});

Template.Create_Study_Session_Page.events({
  'submit .session-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const title = 'Title';
    const name = Meteor.user().profile.name;
    const guests = 0;
    const e = document.getElementById(event.target.course.id);
    let course = e.options[e.selectedIndex].text;
    if (course === 'Select a Course') {
      course = '';
    }
    const topic = event.target.topic.value;
    const f = document.getElementById(event.target.start.id);
    let start = f.options[f.selectedIndex].text;
    if (start === 'Select a Start Time') {
      start = '';
    }
    const g = document.getElementById(event.target.end.id);
    let end = g.options[g.selectedIndex].text;
    if (end === 'Select an End Time') {
      end = '';
    }
    const startV = event.target.start.value;
    const endV = event.target.end.value;

<<<<<<< HEAD
    const newSession = { name, title, course, topic, startTime, endTime };
=======
    // const newSession = { name, course, topic, start, end, startV, endV };
    const newSession = { title, name, guests, course, topic, start, end, startV, endV };
>>>>>>> master
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newSession reflects what will be inserted.
    SessionsSchema.clean(newSession);
    // Determine validity.
    instance.context.validate(newSession);
    console.log('validated run');
    if (instance.context.isValid()) {
      console.log('valid data');
      Sessions.insert(newSession);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Public_Landing_Page');
    } else {
      console.log('invalid data');
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

