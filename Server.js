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

    paramsLabels = {
        "Image": {
            "Bytes": blob,
        }
    }

    paramsFaces = {
        "Image": {
            "Bytes": blob,
        },
        "Attributes":
            ["ALL"]
    }
    var labels, faces;
    rekognition.detectLabels(paramsLabels, function(err, respLabels) {
       if (err) console.log(err, err.stack); // an error occurred
       else     {
           rekognition.detectFaces(paramsFaces, function(err, respFaces) {
              if (err) console.log(err, err.stack); // an error occurred
              else     res.send(generateSentence(
                            respLabels["Labels"],
                            respFaces["FaceDetails"])
                        );
          });
       }

   });

});
function getFaceProperies(face) {
    var faceProps = [];
    for (key in face) {
        if (face[key]["Confidence"] > 90){
            if (key == "Gender") {
                faceProps.push(face[key]["Value"]);
            } else if (!("Value" in face[key]) || face[key]["Value"] != false) {
                faceProps.push(key);
            }
        }
        if(key == "Emotions"){
            for(emote in key){
                if (face[key][emote] != null && face[key][emote]["Confidence"] > 85){
                    faceProps.push(face[key][emote]["Type"]);
                }
            }
        }
    }
    return faceProps
}

function generateSentence(labels, faces) {
    var labelList = [];
    for (var key in labels) {
        labelList.push(labels[key]["Name"]);
    }
    var faceList = [];
    for (var face in faces) {
        faceList.push(getFaceProperies(faces[face]));
    }

    var wordList = labelList;
    for (var key in faceList) {
        wordList = wordList.concat(faceList[key]);
    }

    for (person in faceList){

    }
    part_of_speech(wordList);
}

function part_of_speech(str){
    wordpos = new WordPOS();
    temp = null;
    var posList;
    pos = wordpos.getPOS(str, function(response){
        posList = response;
    });
    return posList;
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
