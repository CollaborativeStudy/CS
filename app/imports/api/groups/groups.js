import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Groups = new Mongo.Collection('Groups');

/**
 * Create the schema for Stuff
 */
export const GroupsSchema = new SimpleSchema({
  name: {
    label: 'name',
    type: String,
    optional: false,
  },
  course: {
    label: 'course',
    type: String,
    optional: false,
    max: 20,
  },
  description: {
    label: 'description',
    type: String,
    optional: false,
  },
  members: {
    label: 'members',
    type: [String],
  },
  posts: {
    label: 'posts',
    type:
        [{
          user: {
            label: 'user',
            type: String,
            optional: false,
            max: 200,
          },
          post: {
            label: 'post',
            type: String,
            optional: false,
            max: 4000,
          },
          time: {
            label: 'time',
            type: String,
          },
        }],
  },
  image: {
    label: 'image',
    type: String,
  },
});

Groups.attachSchema(GroupsSchema);
