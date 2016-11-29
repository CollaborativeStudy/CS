import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Reviews} from '../../api/reviews/reviews.js';

Template.Review_Page.helpers({

  /**
   * @returns {*} All of the Reviews documents.
   */
  reviewsList() {
    return Reviews.find();
  },
});

Template.Review_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews');
  });
});

Template.Create_Review_Page.onRendered(function enableSemantic() {
  const instance = this;
  instance.$('.ui.rating').rating('get rating');
});