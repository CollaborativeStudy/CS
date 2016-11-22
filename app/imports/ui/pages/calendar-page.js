import { Tracker } from 'meteor/tracker';
// Change
import { Events, EventsSchema } from '../../api/events/events.js';


let isPast = ( date ) => {
  // Get access to today's moment
  let today = moment().format();
  return moment( today ).isAfter( date );
};

// Subscribe to the "events" collection.
Template.Calendar_Page.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});

Template.Calendar_Page.onRendered( () => {
  // Initialize the calendar.
  $( '#events-calendar' ).fullCalendar({
    // Add events to the calendar.
    events( start, end, timezone, callback ) {
      let data = Events.find().fetch().map( ( event ) => {
        // Don't allow already past event to be editable.
        event.editable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },
    eventRender( event, element ) {
      element.find( '.fc-content' ).html(
          `<h4>${ event.title }</h4>
         <p class="guest-count">${ event.guests } Guests</p>
         <p class="type-${ event.type }">#${ event.type }</p>
        `
      );
    },
    // Drag and drop events.
    eventDrop( event, delta, revert ) {
      let date = event.start.format();
      if ( !isPast( date ) ) {
        let update = {
          _id: event._id,
          start: date,
          end: date
        };

        Meteor.call( 'editEvent', update, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          }
        });
      } else {
        revert();
        Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
      }
    },
    // Modal.
    dayClick( date ) {
      Session.set( 'eventModal', { type: 'add', date: date.format() } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    },
    // Modal.
    eventClick( event ) {
      Session.set( 'eventModal', { type: 'edit', event: event._id } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    }
  });

  // Updates the calendar if there are changes.
  Tracker.autorun( () => {
    Events.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});