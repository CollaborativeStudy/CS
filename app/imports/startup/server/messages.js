import { Messages } from '../../api/messages/messages.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Reviews to pre-fill the Collection.
 * @type {*[]}
 */
const messagesSeeds = [
  {
    user: 'User1',
    message: 'Hello World!',
    time: 0,
  },
  {
    user: 'User2',
    message: 'Hello Universe!',
    time: 1,
  }
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Messages.find().count() === 0) {
  _.each(messagesSeeds, function seedMessages(messages) {
    Messages.insert(messages);
  });
}