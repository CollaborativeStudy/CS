import { Sessions } from '../../api/sessions/sessions.js';
// Change
import { Events } from '../../api/events/events.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Sessions', function publishSessionsData() {
  return Sessions.find();
});

//Change
// Publish "events".
Meteor.publish( 'events', function() { return Events.find(); } );