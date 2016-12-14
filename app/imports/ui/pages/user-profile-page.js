import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Reviews } from '../../api/reviews/reviews.js';
import { Users } from '../../api/users/users.js';

// Template.User_Profile_Page.onRendered(function enableSemantic() {
//   this.$('#newUser').modal();
// });

Template.User_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews').ready();
    this.subscribe('Users').ready();
  });
});

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

    return averageRate;
  },
  name: function user() {
    // return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
    return Users.findOne({ username: Meteor.user().profile.name }).name;
  },
  userExists() {
    // let val = _.find(Users.find().username, function(user){ return user == Meteor.user().profile.name});
    let val = Users.findOne({ username: Meteor.user().profile.name});
    console.log("val return "+val);
    if(val == undefined){
      console.log('user doesnt exist');
      return false;
    }
    console.log('user exists');
    return true;
  },
  createNewUser(){
    // $('#newUser').modal('show');
    // console.log('create new user');
  },
  getUser () {
    return Users.findOne({ username: Meteor.user().profile.name });
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.User_Profile_Page.events({
      'click .edit-pro'(event, instance){
        console.log('edit pro');
      },
      'click .edit-stud'(event, instance) {
        console.log('edit stud');
      }
    }
)
