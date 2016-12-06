import { Template } from 'meteor/templating';
import { Reviews } from '../../api/reviews/reviews.js';

Template.User_Home_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews');
  });
});

Template.User_Home_Page.helpers({

  /**
   * @returns {*} All of the Reviews documents.
   */
  reviewsList() {
    return Reviews.find();
  },
  reviewsListChecked() {
    return Reviews.find({ checked: 0 });
  },
});

Template.User_Home_Page.events({
  'click .remove-button'(event) {
    event.preventDefault();
    Reviews.remove(event.target.id);
  },
  'click .allow-button'(event) {
    event.preventDefault();
    console.log('clicked allow-button');
    Reviews.update(
        {_id: event.target.id},
        {$set: {checked: 1} }
    );
  },
});