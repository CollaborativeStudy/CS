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
    max: 200,
  },
  endTime: {
    label: 'End Time',
    type: String,
    optional: false,
    max: 200,
  },
});

Sessions.attachSchema(SessionsSchema);
