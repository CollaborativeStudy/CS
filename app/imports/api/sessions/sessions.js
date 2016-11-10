import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Sessions = new Mongo.Collection('Sessions');

/**
 * Create the schema for Sessions
 */
export const SessionsSchema = new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
    optional: false,
    max: 20,
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
    label: 'Start Time',
    type: String,
    optional: false,
  },
  endTime: {
    label: 'End Time',
    type: String,
    optional: false,
  },
});

Sessions.attachSchema(SessionsSchema);
