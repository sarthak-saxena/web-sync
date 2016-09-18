imageApp.controller('mainCtrl', ['$scope', '$rootScope', 'ImageService', '$http','$log',
  function($scope, $rootScope, ImageService, $http, $log) {

    // io.socket.get('/chat/storeEvent');

    $(document).on('click',function(event){
      io.socket.request({
        url: '/chat/storeEvent',
        data: {class: event.target.className,
          type: event.type,
          value: event.target.value
        },
        method: 'POST',
        headers: {
          'Content-Type': 'text/x-yaml'
        }
      });
    });

    io.socket.on('eventPerformed',function(event){
      console.log(event);

      event.class = event.class.split(' ').join('.');
      console.log(event.class);
      $('.'+event.class).trigger(event.type);
      // $(event.target).trigger(event);
    });

    $scope.sendMsg = function(){
      console.log('element clicked');
    };

  }
]);
