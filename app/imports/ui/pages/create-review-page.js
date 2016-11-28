import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Reviews, ReviewsSchema } from '../../api/reviews/reviews.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Create_Review_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ReviewsSchema.namedContext('Create_Review_Page');
});

Template.Create_Review_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Create_Review_Page.onRendered(function enableSemantic() {
  const instance = this;
  instance.$('.ui.rating').rating({maxRating:5});
});

Template.Create_Review_Page.events({
  'submit .review-data-form'(event, instance) {
    event.preventDefault();
    const rating = event.target.rating.value;
    const title = event.target.title.value;
    const review = event.target.review.value;

    const newReview = { rating, title, review };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newSessionData reflects what will be inserted.
    ReviewsSchema.clean(newReview);
    // Determine validity.
    instance.context.validate(newReview);
    if (instance.context.isValid()) {
      Reviews.insert(newReview);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Review_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

