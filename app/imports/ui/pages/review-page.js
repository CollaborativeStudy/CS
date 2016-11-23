import { Template } from 'meteor/templating';
import { Reviews } from '../../api/reviews/reviews.js';

Template.Review_Page.helpers({

  /**
   * @returns {*} All of the Reviews documents.
   */
  reviewsList() {
    return Reviews.find();
  },
});
