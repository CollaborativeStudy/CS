import { Sessions } from '../../api/sessions/sessions.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Sessions to pre-fill the Collection.
 * @type {*[]}
 */
const sessionsSeeds = [
  {
    title: 'changeme',
    name: 'generalname',
    guests: '5',
    course: '1',
    topic: 'generictopic',
    start: 'changeme',
    end: 'changeme',
    startV: '1',
    endV: '2',
  },
];

/**
 * Initialize the Sessions collection if empty with seed data.
 */
if (Sessions.find().count() === 0) {
  _.each(sessionsSeeds, function seedSessions(sessions) {
    Sessions.insert(sessions);
  });
}
