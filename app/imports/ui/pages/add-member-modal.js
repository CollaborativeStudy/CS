import {Template} from 'meteor/templating';
import {Users, UsersSchema} from '../../api/users/users.js';
import {Groups, GroupsSchema} from '../../api/groups/groups.js';
import {_} from 'meteor/underscore';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Add_Member_Modal.onCreated(function onCreated() {
  let template = Template.instance().subscribe('Users').ready();
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = GroupsSchema.namedContext('Add_Member_Modal');
})

Template.Add_Member_Modal.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },

});

Template.Add_Member_Modal.events({
  'submit .add-member-form'(event, instance) {
    event.preventDefault();

    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    const name = groupData && groupData['name'];
    const description = groupData && groupData['description'];
    const course = groupData && groupData['course'];
    const image = groupData && groupData['image'];

    //update the member values
    let newMember = event.target.member.value;

    //determine if user exists
    let userExists = true;
    let val = Users.findOne({ 'username': newMember });
    if (val == undefined) {
      console.log('user doesnt exist');
      userExists = false;
      newMember = 0;
    }
    else {
      console.log('user exists');
    }

    //determine if user is already in the group
    let alreadyIn = false;
    let search = _.find(groupData['members'], function (user) {
      return user == newMember;
    })
    if (search != undefined) {
      console.log('User is already in group.');
      alreadyIn = true;
      newMember = 0;
    }

    //make object for validation
    const updatedGroup = { name, course, description, newMember, image };

    // // Clear out any old validation errors.
    instance.context.resetValidation();
    // // Invoke clean so that updatedGroup reflects what will be inserted.
    GroupsSchema.clean(updatedGroup);
    // // Determine validity.
    instance.context.validate(updatedGroup);

    if (userExists && !alreadyIn) {
      const id = Groups.update(FlowRouter.getParam('_id'), { $push: { members: newMember } });
      instance.messageFlags.set(displaySuccessMessage, true);
      FlowRouter.reload();

    } else {
      console.log("invalid");
      instance.messageFlags.set(displayErrorMessages, true);
      FlowRouter.reload();

    }
  },

  'click .exit'(event, instance){
    event.preventDefault();
    console.log('exit');
    $('.ui.modal.add-member-modal')
        .modal('hide')
    ;
    FlowRouter.reload();

    // this.messageFlags.set(displaySuccessMessage, false);
    // this.messageFlags.set(displayErrorMessages, false);
  },

});