import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Reviews} from '../../api/reviews/reviews.js';
import {Users} from '../../api/users/users.js';

Template.Review_Page.helpers({

  /**
   * @returns {*} All of the Reviews documents.
   */
  reviewsList() {
    return Reviews.find();
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Review_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews');
  });

});
