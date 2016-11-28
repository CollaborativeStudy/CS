import { Sessions } from '../../api/sessions/sessions.js';
import { Reviews } from '../../api/reviews/reviews.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Sessions', function publishSessionsData() {
  return Sessions.find();
});

Meteor.publish('Reviews', function publishReviewsData() {
  return Reviews.find();
});
