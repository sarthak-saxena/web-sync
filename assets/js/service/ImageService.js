imageApp.service('ImageService', function($http, $q) {
  return {
    'getImageData': function(url) {
      var defer = $q.defer();
      $http.post('/ImageData/getImageData', {
        url: window.location.hostname + url
      }).success(function(resp) {
        defer.resolve(resp);
      }).error(function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'uploadImage': function(file) {
      var defer = $q.defer();
      var fd = new FormData();
      fd.append('file', file);
      $http({
        url: 'file/upload',
        method: 'POST',
        data: fd,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }).success(function(resp) {
        defer.resolve(resp);
      }).error(function(err) {
        defer.resolve(err);
      });
      return defer.promise;
    }
  };
});
