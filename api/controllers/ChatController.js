/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
var ids = [];


module.exports = {
  storeEvent: function(req, res) {
    if (req.isSocket && req.method === 'POST') {
    var event = req.params.all();
    _.remove(ids, function(id){
      return id === req.socket.id;
    });
    console.log(req.socket.id);
    sails.sockets.broadcast([], 'eventPerformed', event);
    }
    else if (req.isSocket) {
      ids.push(req.socket.id);
      console.log("Event Subscribed to: " + req.socket.id);
    }
  }
};

