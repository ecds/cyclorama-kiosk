▽
const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: 'xxx',
  secretAccessKey: 'yyy',
  region: 'us-east-1'
});

const s3 = new AWS.S3();

module.exports.getSigned = function(req,res) {
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: 'battleofatlanta',
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err) {
      res.write(JSON.stringify(err));
      return res.end();
    }
    const returnData = {
      signedRequest: decodeURI(data),
      url: `https://battleofatlanta.s3.amazonaws.com/${fileName}`
    };
    res.json(returnData);
    res.end();
  })
};