import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Reviews } from '../../api/reviews/reviews.js';
import { Users } from '../../api/users/users.js';


Template.User_Profile_Page.onRendered(function enableSemantic() {
});

Template.User_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews').ready();
    this.subscribe('Users').ready();
  });
});

Template.User_Profile_Page.helpers({
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
    if(val == undefined){
      return false;
    }
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
  },
  prosList () {
    return Users.findOne({ username: Meteor.user().profile.name }).pros;
  }
});

Template.User_Profile_Page.events({
  'click .edit-pro'(event, instance){
    console.log('edit pro');
  },
  'click .edit-stud'(event, instance) {
    console.log('edit stud');
  },
  'submit .add-pro'(event, instance) {
    event.preventDefault();
    // const e = document.getElementById('level');
    // const f = e.getElementsByTagName('profLevel');
    const e = document.getElementById(event.target.course.id);
    let course = e.options[e.selectedIndex].value;
    if (course === 'Select a Course') {
      course = 0;
    }
    const f = document.getElementById(event.target.profLevel.id);
    let profLevel = f.options[e.selectedIndex].value;
    if (profLevel === 'Select a proficiency level') {
      profLevel = 0;
    }
    const addPro = {course, profLevel};
    // const proList = Users.findOne(FlowRouter.getParam('_id')).pros;
    // if(_.contains(proList, Meteor.user().profile.name) == false) {
    // console.log(addPro);
    console.log(addPro);
    const userID = Users.findOne({ username: Meteor.user().profile.name })._id;
    Users.update(
      { _id: userID },
      { $push: { pros: addPro } });
    // }
    console.log(addPro);
    console.log(Users.findOne({ username: Meteor.user().profile.name }));
  }
});
