/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  getImageData: function(req, res) {
    var url = req.body.url;
    var imageData = {
      cloudVision: [],
      computerVision: []
    };
    ImageDataHelper.getCloudVisionApiData(url, function(data) {
      imageData.cloudVision = data;
      ImageDataHelper.getComputerVisionApiData(url, function(data) {
        imageData.computerVision = data;
        res.json(imageData);
      });
    });
  },
};
