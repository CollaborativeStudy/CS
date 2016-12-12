import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Reviews} from '../../api/reviews/reviews.js';

Template.User_Profile_Page.helpers({

  /**
   * @returns {*} All of the Reviews documents.
   */
  reviewsList() {
    return Reviews.find();
  },
  getAverageRate(){

    let totalRate = 0;
    let size = 0;
    let averageRate = 0;
    let allReviews = Reviews.find();
    allReviews.forEach(function (review) {
      totalRate = totalRate + review.rating;
      size++;
    });
    averageRate = parseInt(Math.round(totalRate / size));

    console.log('Total rate = ' + totalRate);
    console.log('Size = ' + size);
    console.log('Average = ' + averageRate);
    console.log('');
    return averageRate;
  },
});

Template.User_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews').ready();
  });
});