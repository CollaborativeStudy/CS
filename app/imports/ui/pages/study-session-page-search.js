import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';


if (Meteor.isClient) {
  Template.Study_Session_Page_Search.events({
    "submit #search": function (e) {
      e.preventDefault();
      Session.set("searchValue", $("#searchValue").val());
    }
  });

  Template.Study_Session_Page_Search.helpers({
    Sessions: function() {
      Meteor.subscribe("search", Session.get("searchValue"));
      if (Session.get("searchValue")) {
        return Sessions.find({}, { sort: [["score", "desc"]] });
      } else {
        return Sessions.find({});
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Sessions._ensureIndex({
      "value": "text"
    });
    Sessions;
  });

  Meteor.publish("search", function(searchValue) {
    if (!searchValue) {
      return Sessions.find({});
    }
    console.log("Searching for ", searchValue);
    var cursor = Sessions.find(
        { $text: {$search: searchValue} },
        {
          /*
           * `fields` is where we can add MongoDB projections. Here we're causing
           * each document published to include a property named `score`, which
           * contains the document's search rank, a numerical value, with more
           * relevant documents having a higher score.
           */
          fields: {
            score: { $meta: "textScore" }
          },
          /*
           * This indicates that we wish the publication to be sorted by the
           * `score` property specified in the projection fields above.
           */
          sort: {
            score: { $meta: "textScore" }
          }
        }
    );
    return cursor;
  });
}

