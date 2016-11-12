import { Sessions } from '../../api/sessions/sessions.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Sessions', function publishSessionsData() {
  return Sessions.find();
});
