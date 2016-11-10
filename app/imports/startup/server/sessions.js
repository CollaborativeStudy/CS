import { Sessions } from '../../api/sessions/sessions.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Sessions to pre-fill the Collection.
 * @type {*[]}
 */
const sessionsSeeds = [
  { name: 'changeme', course: 3, topic: 'changeme', startTime: 'changeme', endTime: 'changeme' },
  { name: 'changeme1', course: 3, topic: 'changeme1', startTime: 'changeme1', endTime: 'changeme1' },
  { name: 'changeme2', course: 3, topic: 'changeme2', startTime: 'changeme2', endTime: 'changeme2' },
];

/**
 * Initialize the Sessions collection if empty with seed data.
 */
if (Sessions.find().count() === 0) {
  _.each(sessionsSeeds, function seedSessions(sessions) {
    Sessions.insert(sessions);
  });
}
