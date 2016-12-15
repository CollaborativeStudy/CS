import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Reviews } from '../../api/reviews/reviews.js';
import { Users } from '../../api/users/users.js';


Template.User_Profile_Detail_Page.onRendered(function enableSemantic() {
});

Template.User_Profile_Detail_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews').ready();
    this.subscribe('Users').ready();
  });
});

Template.User_Profile_Detail_Page.helpers({
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
    return averageRate;
  },
  name: function user() {
    // return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
    return Users.findOne({ _id: FlowRouter.getParam('_id') }).name;
  },
  getUser () {
    return Users.findOne({ _id: FlowRouter.getParam('_id') });
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  },
  prosList () {
    return Users.findOne({ _id: FlowRouter.getParam('_id') }).pros;
  }
});

Template.User_Profile_Detail_Page.events({
// nothing
});
