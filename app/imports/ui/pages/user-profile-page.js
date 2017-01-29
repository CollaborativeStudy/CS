import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Reviews } from '../../api/reviews/reviews.js';
import { Users } from '../../api/users/users.js';


Template.User_Profile_Page.onRendered(function enableSemantic() {
  this.$('.ui.accordion').accordion();
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
  getUserName : function user() {
    let profileCursor = Users.findOne({ username: Meteor.user().profile.name });
    return `${profileCursor.firstname} ${profileCursor.lastname}`;
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
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  },
  getCourseTitle (course) {
    switch(course) {
      case "ICS 111":
        return "Introduction to Computer Science I";
      case "ICS 141":
        return "Discrete Mathematics for Computer Science I";
      case "ICS 211":
        return "Introduction to Computer Science II";
      case "ICS 241":
        return "Discrete Mathematics for Computer Science II";
      case "ICS 314":
        return "Software Engineering I";
      case "MATH 241":
        return "Calculus I";
      case "MATH 242":
        return "Calculus II";
      case "MATH 371":
        return "Elementary Probability Theory";
    }
  },
  getProfLevelColor(level){
    switch(level){
      case "low":
        return "red";
      case "medium":
        return "yellow";
      case "high":
        return "green";
    }
  },
  prosList () {
    return Users.findOne({ username: Meteor.user().profile.name }).pros;
  },
  studsList () {
    return Users.findOne({ username: Meteor.user().profile.name }).studs;
  },
});

Template.User_Profile_Page.events({
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
    let profLevel = f.options[f.selectedIndex].value;
    if (profLevel === 'Select a proficiency level') {
      profLevel = 0;
    }
    const addPro = {course, profLevel};
    // const proList = Users.findOne(FlowRouter.getParam('_id')).pros;
    // if(_.contains(proList, Meteor.user().profile.name) == false) {
    // console.log(addPro);
    const userID = Users.findOne({ username: Meteor.user().profile.name })._id;
    Users.update(
      { _id: userID },
      { $push: { pros: addPro } });
    // }
  },
  'submit .add-stud'(event, instance) {
    event.preventDefault();
    const e = document.getElementById(event.target.course2.id);
    let course = e.options[e.selectedIndex].value;
    if (course === 'Select a Course') {
      course = 0;
    }
    const f = document.getElementById(event.target.profLevel2.id);
    let profLevel = f.options[f.selectedIndex].value;
    if (profLevel === 'Select a proficiency level') {
      profLevel = 0;
    }
    const addStud = { course, profLevel };
    // const proList = Users.findOne(FlowRouter.getParam('_id')).pros;
    // if(_.contains(proList, Meteor.user().profile.name) == false) {
    const userID = Users.findOne({ username: Meteor.user().profile.name })._id;
    Users.update(
        { _id: userID },
        { $push: { studs: addStud } });
    // }
  },
  'click .removePro'(event){
    event.preventDefault();
    const userID = Users.findOne({ username: Meteor.user().profile.name })._id;
    const course = event.target.id;
    const removePro = { course };
    Users.update(
        { _id: userID },
        { $pull: { pros: removePro } });
    FlowRouter.reload();
  },
  'click .removeStud'(event){
    event.preventDefault();
    const userID = Users.findOne({ username: Meteor.user().profile.name })._id;
    const course = event.target.id;
    const removeStud = { course };
    Users.update(
        { _id: userID },
        { $pull: { studs: removeStud } });
    FlowRouter.reload();
  },
  'click .editProf'(event){
    event.preventDefault();

    const editID = event.target.id+ "editID";
    if(document.getElementById(editID).style.visibility == "hidden") {
      document.getElementById(editID).style.visibility = "visible";
    } else {
      document.getElementById(editID).style.visibility = "hidden";
    }
  },
  'click .lowButton'(event){
    event.preventDefault();

    const userID = Users.findOne({ username: Meteor.user().profile.name })._id;
    let course = event.target.id;
    const editID = course + "editID";
    document.getElementById(editID).style.visibility = "hidden";

    const category = course.slice(-1);
    course = course.slice(0, -1);
    const removeCourse = { course };
    const profLevel = "low";
    const addCourse = { course, profLevel };

    if (category === 'P') {
      Users.update(
          { _id: userID },
          { $pull: { pros: removeCourse } });

      Users.update(
          { _id: userID },
          { $push: { pros: addCourse } });
    } else {
      Users.update(
          { _id: userID },
          { $pull: { studs: removeCourse } });

      Users.update(
          { _id: userID },
          { $push: { studs: addCourse } });
    }
    FlowRouter.reload();
  },
  'click .mediumButton'(event){
    event.preventDefault();

    const userID = Users.findOne({ username: Meteor.user().profile.name })._id;
    let course = event.target.id;
    const editID = course + "editID";
    document.getElementById(editID).style.visibility = "hidden";

    const category = course.slice(-1);
    course = course.slice(0, -1);
    const removeCourse = { course };
    const profLevel = "medium";
    const addCourse = { course, profLevel };

    if (category === 'P') {
      Users.update(
          { _id: userID },
          { $pull: { pros: removeCourse } });

      Users.update(
          { _id: userID },
          { $push: { pros: addCourse } });
    } else {
      Users.update(
          { _id: userID },
          { $pull: { studs: removeCourse } });

      Users.update(
          { _id: userID },
          { $push: { studs: addCourse } });
    }
    FlowRouter.reload();
  },
  'click .highButton'(event){
    event.preventDefault();

    const userID = Users.findOne({ username: Meteor.user().profile.name })._id;
    let course = event.target.id;
    const editID = course + "editID";
    document.getElementById(editID).style.visibility = "hidden";

    const category = course.slice(-1);
    course = course.slice(0, -1);
    const removeCourse = { course };
    const profLevel = "high";
    const addCourse = { course, profLevel };
    console.log(category)

    if (category === 'P') {
      Users.update(
          { _id: userID },
          { $pull: { pros: removeCourse } });

      Users.update(
          { _id: userID },
          { $push: { pros: addCourse } });
    } else {
      Users.update(
          { _id: userID },
          { $pull: { studs: removeCourse } });

      Users.update(
          { _id: userID },
          { $push: { studs: addCourse } });
    }
    FlowRouter.reload();
  },
});
