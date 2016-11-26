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
    label: "Title of the event.",
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
  },
  guests: {
    label: "The number of guests expected at this study session.",
    type: Number
  }
});

Sessions.attachSchema(SessionsSchema);
