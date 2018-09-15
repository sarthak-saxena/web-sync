/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require("lodash");

module.exports = {
  storeEvent: function(req, res) {
    if (req.isSocket && req.method === "POST") {
      var event = req.params.all();

      sails.sockets.subscribers("event_room", function(err, socketIds) {
        console.log("socket", socketIds, JSON.stringify(event));

        // perform only if two sockets are connected
        if (socketIds.length > 1) {
          var ids = socketIds;
          _.remove(ids, function(id) {
            return id === req.socket.id;
          });
          console.log("eventPerformed", JSON.stringify(event));
          sails.sockets.broadcast(ids, "eventPerformed", event);
        }
      });
    } else if (req.isSocket) {
      console.log("here");
      sails.sockets.join(req.socket, "event_room", function() {
        console.log("socket joined event_room");
      });
      console.log(
        "Event Subscribed to: " +
          JSON.stringify(req.socket.rooms) +
          req.socket.id
      );
      sails.sockets.broadcast(req.socket.id, "subscribed", req.socket.id);
    }
  },

  mouseTracker: function(req, res) {
    if (req.isSocket && req.method === "POST") {
      var event = req.params.all();

      sails.sockets.subscribers("event_room", function(err, socketIds) {
        console.log("socket", socketIds, JSON.stringify(event));

        // perform only if two sockets are connected
        if (socketIds.length > 1) {
          var ids = socketIds;
          _.remove(ids, function(id) {
            return id === req.socket.id;
          });
          console.log("mouseEvent", JSON.stringify(event));
          sails.sockets.broadcast(ids, "mouseEvent", event);
        }
      });
    } else if (req.isSocket) {
      sails.sockets.join(req.socket, "event_room", function() {
        console.log("socket joined event_room");
      });
      console.log(
        "Event Subscribed to: " +
          JSON.stringify(req.socket.rooms) +
          req.socket.id
      );
      sails.sockets.broadcast(req.socket.id, "subscribed", req.socket.id);
    }
  },

  movementControls: function(req, res) {
    if (req.isSocket && req.method === "POST") {
      var event = req.params.all();

      sails.sockets.subscribers("event_room", function(err, socketIds) {
        console.log("socket", socketIds, JSON.stringify(event));

        // perform only if two sockets are connected
        if (socketIds.length > 1) {
          var ids = socketIds;
          _.remove(ids, function(id) {
            return id === req.socket.id;
          });
          console.log("movementEvent", JSON.stringify(event));
          sails.sockets.broadcast(ids, "movementEvent", event);
        }
      });
    } else if (req.isSocket) {
      sails.sockets.join(req.socket, "event_room", function() {
        console.log("socket joined event_room");
      });
      console.log(
        "Event Subscribed to: " +
        JSON.stringify(req.socket.rooms) +
        req.socket.id
      );
      sails.sockets.broadcast(req.socket.id, "subscribed", req.socket.id);
    }
  }
};
