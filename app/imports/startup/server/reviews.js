import { Reviews } from '../../api/reviews/reviews.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Reviews to pre-fill the Collection.
 * @type {*[]}
 */
const reviewSeeds = [
  {
    rating: 5,
    title: 'Always On Track!',
    review: 'Mary kept the whole group on topic and was a great mediator when an argument got out of hand.',
    checked: 0,
  },
  {
    rating: 4,
    title: 'Cool!',
    review: 'No comment.',
    checked: 0,
  },
  {
    rating: 1,
    title: 'Not Cool',
    review: 'My friend and I was talking and she interrupted me and started telling me what to do.. -_-',
    checked: 0,
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Reviews.find().count() === 0) {
  _.each(reviewSeeds, function seedReviews(reviews) {
    Reviews.insert(reviews);
  });
}
