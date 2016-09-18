imageApp.controller('mainCtrl', ['$scope', '$rootScope', 'ImageService', '$http','$log',
  function($scope, $rootScope, ImageService, $http, $log) {
    $scope.getChatData = function(){
      $http.get('/chat').success(function(response){
        $scope.chatList = response;
        $log.info(response);
      });
    };

    $scope.getChat = function(){
      io.socket.get('/chat/addConversation');
      $scope.getChatData();
    };

    $scope.getChat();

    $scope.chatUser = "nikkyBot";
    $scope.chatMessage = "";

    io.socket.on('chat', function(obj){
      if(obj.verb === 'created') {
        $log.info(obj);
        $scope.chatList.push(obj.data);
        $scope.$digest();
      }
    });

    $scope.sendMsg = function(){
      $log.info($scope.chatMessage);
      io.socket.post('/chat/addConversation/',{user:$scope.chatUser,message: $scope.chatMessage});
      $scope.chatMessage = "";
    };

    $scope.destroyChat = function() {
      $http.delete('/chat/deleteConversations').success(function(response){
        console.log("SUCCESS",response);
        $scope.getChatData();
      });
    };

  }
]);
