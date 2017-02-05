var express = require('express'),
    aws = require('aws-sdk'),
    multer = require('multer'),
    fs = require("fs"),
    $ = require('jquery');
    natural = require("natural");
    require("wordnet-db");
    WordPOS = require('wordpos');

var final;
aws.config.update({
    secretAccessKey: 'vlGsfQS6tgs85RyZ+9mEr8smaIiDzb1KARBxBPhQ',
    accessKeyId: 'AKIAIPJ5KKIHO2364E2A',
    region: 'us-east-1'
});

var app = express();

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

var rekognition = new aws.Rekognition();
//open in browser to see upload form
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), function (req, res, next) {

    var blob = new Buffer(req.file.buffer, 'base64');

    params = {
        "Image": {
            "Bytes": blob,
        },
    }

    rekognition.detectLabels(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     {res.send(generateSentence(data))};           // successful response
   });
});

function generateSentence(data, callback) {
  if (callback) return data;

    var result = '';
    for (var key in data["Labels"]) {
            result = result + data["Labels"][key]["Name"] + " ";
    }
    part_of_speech(result);
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function part_of_speech(str){
  console.log(str);
  wordpos = new WordPOS();
  temp = null;
  var test;
  wordpos.getPOS(str, function(data){
    console.log(data);
    generateSentence(data,true);
  });
}

function textReturn(str){

}
