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

  storeEventv2: function(req, res) {
    if (req.isSocket && req.method === "POST") {
      var event = req.params.all();

      sails.sockets.subscribers("event_room", function(err, socketIds) {
        // perform only if two sockets are connected
        if (socketIds.length > 1) {
          var ids = socketIds;
          _.remove(ids, function(id) {
            return id === req.socket.id;
          });

          Chat.find({}).then(result => {
            console.log(result);
            if (result.find(r => r.userId === req.socket.id).isParent) {
              sails.sockets.broadcast(ids, "eventPerformed", event);
            } else {
              let parent = result.find(r => r.isParent);
              let socketId = parent.userId;
              sails.sockets.broadcast([socketId], "eventPerformed", event);
            }
          });
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

      Chat.find({ isParent: true }).then(result => {
        Chat.create({
          id: req.socket.id,
          userId: req.socket.id,
          isParent: result.length === 0
        }).exec(function(error, data) {
          console.log(data);
          if (data !== undefined) {
            Chat.publishCreate({
              id: data.id,
              userId: data.userId,
              isParent: data.isParent
            });
          } else {
            console.log("empty data");
          }
        });
      });

      sails.sockets.broadcast(req.socket.id, "subscribed", req.socket.id);
    }
  },

  mouseTracker: function(req, res) {
    if (req.isSocket && req.method === "POST") {
      var event = req.params.all();

      sails.sockets.subscribers("event_room", function(err, socketIds) {
        console.log("socket", socketIds);

        // perform only if two sockets are connected
        if (socketIds.length > 1) {
          var ids = socketIds;
          _.remove(ids, function(id) {
            return id === req.socket.id;
          });
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

  mouseTrackerv2: function(req, res) {
    if (req.isSocket && req.method === "POST") {
      var event = req.params.all();

      sails.sockets.subscribers("event_room", function(err, socketIds) {
        console.log("socket mouse", socketIds);

        // perform only if two sockets are connected
        if (socketIds.length > 1) {
          var ids = socketIds;
          _.remove(ids, function(id) {
            return id === req.socket.id;
          });
          Chat.find({userId: req.socket.id}).then(result => {
            console.log(result);
            if (result[0].isParent) {
              sails.sockets.broadcast(ids, "mouseEvent", event);
            }
          });
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
        // perform only if two sockets are connected
        if (socketIds.length > 1) {
          var ids = socketIds;
          _.remove(ids, function(id) {
            return id === req.socket.id;
          });
          console.log("movementEvent");
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
  },

  movementControlsv2: function(req, res) {
    if (req.isSocket && req.method === "POST") {
      var event = req.params.all();

      sails.sockets.subscribers("event_room", function(err, socketIds) {
        // perform only if two sockets are connected
        if (socketIds.length > 1) {
          var ids = socketIds;
          _.remove(ids, function(id) {
            return id === req.socket.id;
          });
          console.log("movementEvent");
          Chat.find({userId: req.socket.id}).then(result => {
            console.log(ids);
            if (result[0].isParent) {
              sails.sockets.broadcast(ids, "movementEvent", event);
            }
          });
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

  destroy: function() {
    Chat.destroy({}).exec(function(err) {
      console.log("all data deleted");
    });
  }
};

// module.exports = {
//   addConversation: function(req, res){
//     if (req.isSocket && req.method === 'POST') {
//       var data = req.params.all();
//       Chat.create(data).exec(function(error,data){
//         console.log(data);
//         if(data !== undefined){
//           Chat.publishCreate({
//             id: data.id,
//             message: data.message,
//             user: data.user
//           });
//         }
//         else {
//           console.log("empty data");
//         }
//       });
//     }
//     else if (req.isSocket) {
//       Chat.watch(req.socket);
//       console.log("User Subscribed to: " + req.socket.id);
//     }
//   },
//
//   deleteConversations: function(req, res) {
//     Chat.destroy({}).exec(function(err){
//       if (err){
//         res.json(err);
//       }
//       else {
//         res.json({success: true});
//       }
//     });
//   }
// };
