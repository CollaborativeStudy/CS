import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Reviews = new Mongo.Collection('Reviews');

/**
 * Create the schema for Reviews
 */
export const ReviewsSchema = new SimpleSchema({
  rating: {
    label: 'rating',
    type: Number,
    optional: false,
  },
  title: {
    label: 'title',
    type: String,
    optional: false,
    max: 200,
  },
  review: {
    label: 'review',
    type: String,
    optional: false,
    max: 4000,
  },
});

Reviews.attachSchema(ReviewsSchema);
