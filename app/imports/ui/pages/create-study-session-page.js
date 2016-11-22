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
    const name = 'John Doe changeme';
    /* const course = event.target.course.value;
    const topic = event.target.topic.value;
    const startTime = event.target.startTime.value;
    const endTime = event.target.endTime.value; */
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

    const newSession = { name, course, topic, startTime, endTime };
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
});

