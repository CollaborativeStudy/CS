import { Sessions } from '../../api/sessions/sessions.js';
<<<<<<< HEAD
import { Reviews } from '../../api/reviews/reviews.js';
=======
// Change
import { Events } from '../../api/events/events.js';
>>>>>>> refs/remotes/origin/master
import { Meteor } from 'meteor/meteor';

Meteor.publish('Sessions', function publishSessionsData() {
  return Sessions.find();
});

<<<<<<< HEAD
Meteor.publish('Reviews', function publishReviewsData() {
  return Reviews.find();
});
=======
//Change
// Publish "events".
Meteor.publish( 'events', function() { return Events.find(); } );
>>>>>>> refs/remotes/origin/master
