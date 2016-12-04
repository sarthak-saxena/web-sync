imageApp.controller('mainCtrl', ['$scope', '$rootScope', 'ImageService', '$http', '$log',
  function($scope, $rootScope, ImageService, $http, $log) {

    io.socket.get('/chat/storeEvent');

    $(document).on('click', function(event) {
      if (!_.isUndefined(event.originalEvent)) {
        io.socket.request({
          url: '/chat/storeEvent',
          data: {
            class: event.target.className,
            type: event.type
          },
          method: 'POST',
          headers: {
            'Content-Type': 'text/x-yaml'
          }
        });
      }
    });

    $(document).on('keyup', function(event) {
      var className = formatClass(event.target.className);
      console.log(event.which);
      if (!_.isUndefined(event.originalEvent)) {
        io.socket.request({
          url: '/chat/storeEvent',
          data: {
            class: event.target.className,
            type: event.type,
            value: $('input.' + className).val()
          },
          method: 'POST',
          headers: {
            'Content-Type': 'text/x-yaml'
          }
        });
      }
    });

    $(window).on('scroll', function(event) {
      if (!_.isUndefined(event.originalEvent)) {
        io.socket.request({
          url: '/chat/storeEvent',
          data: {
            scrollValue: $(window).scrollTop(),
            type: event.type,
          },
          method: 'POST',
          headers: {
            'Content-Type': 'text/x-yaml'
          }
        });
      }
    });

    io.socket.on('eventPerformed', function(event) {
      switch (event.type) {
        case 'click':
          event.class = event.class.split(' ').join('.');
          $('.' + event.class).trigger(event.type);
          break;
        case 'scroll':
          $(window).scrollTop(event.scrollValue);
          break;
        case 'keyup':
          var className = formatClass(event.class);
          $('input.' + className).val(event.value);
          break;
      }
    });

    var formatClass = function(classes) {
      var eventClass = classes.split(' ');
      var events = _.remove(eventClass, function(event) {
        return event[0] !== 'n' && event[1] !== 'g';
      });
      var className = events.join('.');
      return className;
    };

    $scope.destroyChat = function() {
      alert('test');
    };

    $scope.sendMsg = function() {
      alert('clicked');
    };
  }
]);
