import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Groups} from '../../api/groups/groups.js';

Template.Group_Page.helpers({

  /**
   * @returns {*} All of the Reviews documents.
   */
  groupsList() {
    return Groups.find();
  },
  groupDataField(fieldName) {
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return groupData && groupData[fieldName];
  },
});

Template.Group_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Groups');
  });
});

Template.Group_Page.events({
  'click .create-group'(event, instance) {
    $('.ui.modal.groups-modal')
        .modal('show')
    ;
  },
});
