imageApp.controller('mainCtrl', ['$scope', '$rootScope', 'ImageService', '$http',
  function($scope, $rootScope, ImageService, $http) {

    $scope.visionUrl = '/images/77f23ec3-d3d5-42b4-8947-1b2bfba9744e.jpg';

    var getImageData = function(url) {
      ImageService.getImageData(url).then(function(response) {
        $scope.data = response;
        console.log(response);
      });
    };

    getImageData($scope.visionUrl);

    $scope.upload = function(file) {
      ImageService.uploadImage(file).then(function(response) {
        $scope.visionUrl = '/images/' + response.file[0].fd.split('images/')[1];
        getImageData($scope.visionUrl);
      });
    };
  }
]);
