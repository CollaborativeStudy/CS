import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Reviews, ReviewsSchema} from '../../api/reviews/reviews.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';
let ratingError = false;
let titleError = false;
let reviewError = false;

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
    switch(fieldName) {
      case 'rating': if(ratingError === false){return true;} else {return false;};
      case 'title': if(titleError === false){return true;} else {return false;};
      case 'review': if(reviewError === false){return true;} else {return false;};
    }
  },
});

Template.Create_Review_Page.onRendered(function enableSemantic() {
  const instance = this;
  instance.$('.ui.rating').rating({
    onRate: function (value) {
      return value;
    }
  });
});

Template.Create_Review_Page.events({
  'submit .review-data-form'(event, instance) {
    event.preventDefault();
    let rating = 0;
    rating = $('.ui.rating').rating('get rating');
    const title = event.target.title.value;
    const review = event.target.review.value;
    const checked = 0;

    const newReview = {'rating': rating, 'title': title, 'review': review, 'checked': checked };
    console.log('New Review');
    console.log(newReview);

    if (rating === 0) {ratingError = true;}
    if (title === "") {titleError = true;}
    if (review === "") {reviewError = true;}

    // // Clear out any old validation errors.
    // instance.context.resetValidation();
    // console.log('1');
    // // Invoke clean so that newSessionData reflects what will be inserted.
    // ReviewsSchema.clean(newReview);
    // console.log('2');
    // // Determine validity.
    // instance.context.validate(newReview);
    // console.log('3');

    if (ratingError == false || titleError == false|| reviewError == false ){
      console.log('4');
      Reviews.update(
          { _id: FlowRouter.getParam('_id') },
          { $push: { userReviews: newReview } });
      console.log('5');
      instance.messageFlags.set(displayErrorMessages, false);
      $('.ui.modal.create-review-modal')
          .modal('hide')
      ;
      console.log('6');
    } else {
      console.log('7');
      instance.messageFlags.set(displayErrorMessages, true);
    }
    FlowRouter.reload();
  },
});

