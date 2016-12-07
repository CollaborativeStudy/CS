import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Users = new Mongo.Collection('Users');

// Block all database operations on the client-side.
Users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

/**
 * Create the schema for Sessions
 */
export const UsersSchema = new SimpleSchema({
  //
  name: {
    label: 'Name',
    type: String,
    optional: false,
  },
  username: {
    label: 'Username',
    type: String,
    optional: false,
  },
  profilePicture: {
    label: 'Profile Picture',
    type: String,
    optional: false,
  },
  pros: {
    label: 'Pros',
    type: String,
    optional: true,
  },
  studs: {
    label: 'Studs',
    type: String,
    optional: true,
  },
  termsOfUse: {
    label:'Terms of Use',
    type: Boolean,
    optional: false,
  },
  admin: {
    label: 'Admin Permission',
    type: Boolean,
    optional: false,
  },
  tutorial: {
    label: 'Tutorial',
    type: Boolean,
    optional: false,
  }
});

Users.attachSchema(UsersSchema);