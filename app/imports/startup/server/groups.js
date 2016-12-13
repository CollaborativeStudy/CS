import { Groups } from '../../api/groups/groups.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Groups to pre-fill the Collection.
 * @type {*[]}
 */
const groupsSeeds = [
  { name: 'ICS 314', description:"Final Project Group. Creating a study buddy app that...", users: ["Mary", "Chad", "Mariah", "Neal"] },
  { name: 'ICS 311', description:"Group of death", users: ['Mary', 'Chad', 'Neal'] },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Groups.find().count() === 0) {
  _.each(groupsSeeds, function seedGroups(groups) {
    Groups.insert(groups);
  });
}
