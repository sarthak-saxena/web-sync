imageApp.controller('mainCtrl',
  function() {
    io.socket.get('192.168.0.102/chat/storeEvent');

    $(document).on('click', function(event) {
      if (!_.isUndefined(event.originalEvent)) {
        io.socket.request({
          url: '192.168.0.102/chat/storeEvent',
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
          url: '192.168.0.102/chat/storeEvent',
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
          url: '192.168.0.102/chat/storeEvent',
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
      var className;
      switch (event.type) {
        case 'click':
          event.class = event.class.split(' ').join('.');
          className = formatClass(event.class);
          $('input.' + className).focus();
          $('.' + event.class).trigger(event.type);
          break;
        case 'scroll':
          $(window).scrollTop(event.scrollValue);
          break;
        case 'keyup':
          className = formatClass(event.class);
          $('input.' + className).focus();
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
  }
);
