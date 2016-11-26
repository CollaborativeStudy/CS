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

Sessions.attachSchema(SessionsSchema);
