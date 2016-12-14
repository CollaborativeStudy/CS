import {Groups} from '../../api/groups/groups.js';
import {_} from 'meteor/underscore';

/**
 * A list of Groups to pre-fill the Collection.
 * @type {*[]}
 */
const groupsSeeds = [
  {
    name: 'Study Buddy',
    course: "ICS 314",
    description: 'Final Project Group. Creating a study buddy app that...',
    members: ['Mary', 'Chad', 'Mariah', 'Neal'],
    image: '/images/CSLogo1.png',
  },
  {
    name: 'Death',
    course: 'ICS 311',
    description: 'Group of death. Algorithms final review.',
    members: ['Mary', 'Chad', 'Neal'],
    image: '/images/CSLogo1.png',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Groups.find().count() === 0) {
  _.each(groupsSeeds, function seedGroups(groups) {
    Groups.insert(groups);
  });
}
