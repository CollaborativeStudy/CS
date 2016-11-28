/* import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'; */

/* eslint-disable object-shorthand */

/* export const Sessions = new Mongo.Collection('Sessions'); */

/**
 * Create the schema for Sessions
 */
/* export const SessionsSchema = new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
    optional: false,
    max: 200,
  },
  course: {
    label: 'Course',
    type: String,
    optional: false,
    max: 200,
  },
  topic: {
    label: 'Topic',
    type: String,
    optional: false,
    max: 200,
  },
  startTime: {
    label: 'Start Time',
    type: String,
    optional: false,
  },
  endTime: {
    label: 'End Time',
    type: String,
    optional: false,
  },
  startTimeV: {
    label: 'Start Time Value',
    type: Number,
    optional: false,
  },
  endTimeV: {
    label: 'End Time Value',
    type: Number,
    optional: false,
    custom: function startAndEnd() {
      let x = 0;
      if (this.value < this.field('startTimeV').value || this.value === this.field('startTimeV').value) {
        x = 'endTimeV';
      } return x;
    },
  },
});

Sessions.attachSchema(SessionsSchema); */

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Sessions = new Mongo.Collection('Sessions');

/**
 * Create the schema for Sessions
 */
export const SessionsSchema = new SimpleSchema({
  // "title" is required by fullcalendar.
  // Title of the event.
  title: {
    label: 'Title of the event.',
    type: String,
    optional: false,
  },
  name: {
    label: 'Name',
    type: String,
    optional: false,
  },
  guests: {
    label: 'The number of guests expected at this study session.',
    type: Number,
  },
  course: {
    label: 'Course',
    type: String,
    optional: false,
  },
  topic: {
    label: 'Topic',
    type: String,
    optional: false,
  },
  // "start" is required by fullcalendar.
  // Start is the start time of the event.
  start: {
    label: 'Start time of event.',
    type: String,
    optional: false,
  },
  end: {
    label: 'End time of event.',
    type: String,
    optional: false,
  },
  startV: {
    label: 'Start Time Value',
    type: Number,
    optional: false,
  },
  endV: {
    label: 'End Time Value',
    type: Number,
    optional: false,
    custom: function startAndEnd() {
      let x = 0;
      if (this.value < this.field('startV').value || this.value === this.field('startV').value) {
        x = 'endV';
      }
      console.log('x: ' + x);
      return x;
    },
  },
});

Sessions.attachSchema(SessionsSchema);
