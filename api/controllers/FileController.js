/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  upload: function(req, res) {
    var uploadFile = req.file('file');
    uploadFile.upload({
      dirname: '../../assets/images'
    }, function onUploadComplete(err, files) {
      if (err) {
        return res.serverError(err);
      }
      res.json({
        status: 200,
        file: files
      });
    });
  }
};
