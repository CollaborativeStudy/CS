import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../api/groups/groups.js';
import { Users } from '../../api/users/users.js';

Template.Group_Details_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Groups');
    this.subscribe('Users');
  });
});

Template.Group_Details_Page.helpers({
  groupsList() {
    return Groups.find();
  },
  groupDataField(fieldName) {
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return groupData && groupData[fieldName];
  },
  membersList() {
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return groupData['members'];
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  },
  getUserFirst(member) {
    return Users.findOne({ username: member }).firstname;
  },
  getUserLast(member) {
    return Users.findOne({ username: member }).lastname;
  },
  getUserAvatar(member) {
    return Users.findOne({ username: member }).profilePicture;
  },
});

Template.Group_Details_Page.events({
  'click .edit-group'(event, instance) {
    $('.ui.modal.edit-modal')
        .modal('show')
    ;
  },
  'click .remove-member'(event, instance) {
    event.preventDefault();
    Groups.update(
        { _id: FlowRouter.getParam('_id') },
        { $pull: { members: event.target.id}  });
    FlowRouter.reload();

    // Console Print Data
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    console.log('remove item ' + event.target.id);
    console.log('List: ' + groupData['members']);
  },
  'click .add-member'(event, instance) {
    $('.ui.modal.add-member-modal')
        .modal('show')
    ;
  },
  'submit .new-post'(event){
    event.preventDefault();

    // const user = Meteor.user().profile.name;
    // const message = event.target.message.value;
    // const time = new Date();
    //
    // const newMessage = { user, message, time };
    // // Clear out any old validation errors.
    // // instance.context.resetValidation();
    // // Invoke clean so that newSessionData reflects what will be inserted.
    // MessagesSchema.clean(newMessage);
    // Messages.insert(newMessage);
    //
    // clear form
    // event.target.text = '';
  },
});
