var request = require('request');
var vision = require('google-vision-api-client');
var requtil = vision.requtil;
var jsonfile = '/Users/sarthaksaxena/AdIQ-f7fb55623147.json';

//Initialize the api
vision.init(jsonfile);

module.exports = {
  getCloudVisionApiData: function(url, next) {
    //Hit cloud vision API
    //Build the request payloads
    var d = requtil.createRequests().addRequest(
      requtil.createRequest(
        '/Users/sarthaksaxena/work/sails-new/first/assets/images/koovs-screenshot.png')
      .withFeature('FACE_DETECTION')
      .withFeature('TEXT_DETECTION')
      .withFeature('LABEL_DETECTION')
      .withFeature('LANDMARK_DETECTION')
      .withFeature('SAFE_SEARCH_DETECTION')
      .withFeature('LOGO_DETECTION')
      .build());

    //Do query to the api server
    vision.query(d, function(e, r, d) {
      if (e) console.log('ERROR:', e);
      console.log(JSON.stringify(d));
      next(d);
    });
  },

  getComputerVisionApiData: function(url, next) {
    //Hit computer vision API
    var features = 'Color,Faces,Adult,Tags,Description,Categories,ImageType';
    var data = {
      url: 'http://' + url
    };
    data = {
      url: 'http://www.shopickr.com/wp-content/uploads/2015/07/zivame-lingerie-bra-panty-sale-india-2016.jpg'
    };
    request({
      url: "https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=" + features,
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '0b31232487b941ec8395e8b65596f581'
      },
      body: JSON.stringify(data)
    }, function(error, response, body) {
      next(JSON.parse(response.body));
    });
  }
};
