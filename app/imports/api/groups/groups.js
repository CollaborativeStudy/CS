import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Groups = new Mongo.Collection('Groups');

/**
 * Create the schema for Stuff
 */
export const GroupsSchema = new SimpleSchema({
  id:{
    label: 'id',
    type: Number,
    optional: false,
  },
  name: {
    label: 'name',
    type: String,
    optional: false,
    max: 20,
  },
  course: {
    label: 'course',
    type: String,
    optional: false,
    max: 40,
  },
  description:{
    label: 'description',
    type: String,
    optional: false,
    max: 400,
  },
  users: {
    label: 'users',
    type: [String],
  },
  image: {
    label: 'image',
    type: String,
  },
});

Groups.attachSchema(GroupsSchema);
