/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addConversation: function(req, res){
    if (req.isSocket && req.method === 'POST') {
      var data = req.params.all();
      Chat.create(data).exec(function(error,data){
        console.log(data);
        Chat.publishCreate({
          id: data.id,
          message: data.message,
          user: data.user
        });
      });
    }
    else if (req.isSocket) {
      Chat.watch(req.socket);
      console.log("User Subscribed to: " + req.socket.id);
    }
  },

  deleteConversations: function(req, res) {
    Chat.destroy({}).exec(function(err){
      if (err){
        res.json(err);
      }
      else {
        res.json({success: true});
      }
    });
  }
};

