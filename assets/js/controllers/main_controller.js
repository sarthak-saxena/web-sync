imageApp.controller('mainCtrl', ['$scope', '$rootScope', 'ImageService', '$http',
  function($scope, $rootScope, ImageService, $http) {

    $scope.visionUrl = '/images/koovs-screenshot.png';

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
