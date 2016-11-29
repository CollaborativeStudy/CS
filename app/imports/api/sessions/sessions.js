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
>>>>>>> master
    type: String,
    optional: false,
  },
  // "start" is required by fullcalendar.
  // Start is the start time of the event.
  start: {
    label: "Start time of event.",
    type: String,
    optional: false
  },
  end: {
    label: "End time of event.",
    type: String,
    optional: false
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
  startTime: {
    label: 'startTime',
    type: String,
    optional: false,
  },
  endTime: {
    label: 'endTime',
    type: String,
    optional: false,
<<<<<<< HEAD
=======
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
  guests: {
    label: "The number of guests expected at this study session.",
    type: Number
  },
  pros: {
    label: "List of pros attending the event.",
    type: String,
    optional: false,
  },
  studs: {
    label: "List of studs attending the event.",
    type: String,
    optional: false,
  }
});

Sessions.attachSchema(SessionsSchema);
