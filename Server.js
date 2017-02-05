var express = require('express'),
    aws = require('aws-sdk'),
    multer = require('multer'),
    fs = require("fs"),
    $ = require('jquery');
    natural = require("natural");
    require("wordnet-db");
    WordPOS = require('wordpos');
    var structures = require('./structures');

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
              else     createComic(
                        respLabels["Labels"],
                        respFaces["FaceDetails"], function(data){
                            res.send(data);
                        });
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
                if (face[key][emote] != null && face[key][emote]["Confidence"] > 60){
                    faceProps.push(face[key][emote]["Type"]);
                }
            }
        }
    }
    return faceProps
}

function createComic(labels, faces, send) {
    var labelList = [];
    for (var key in labels) {
        labelList.push(labels[key]["Name"]);
    }
    var faceList = [];
    for (var face in faces) {
        faceList.push(getFaceProperies(faces[face]));
    }
    generateWordList(labelList, function(arr){

        for(pos in arr){
            for (word in arr[pos]){
                if (arr[pos][word] == "Human" ){
                    arr[pos].splice(word, 1);
                }
            }
        }

        var sentenceList = [];
        for (person in faceList){
            sentenceList[person] = generateSentence(arr, faceList[person]);
        }
        send(sentenceList);
    });
}

function getStructure(person){
    for (key in person){
        if (person[key] == "HAPPY"){
            return structures.getHappyPhrases();
        }else if (person[key] == "ANGRY"){
            return structures.getAngryPhrases();
        }else if (person[key] == "DISGUSTED"){
            return structures.getDisgustedPhrases();
        }else if (person[key] == "CALM"){
            return structures.getCalmPhrases();
        }else if (person[key] == "CONFUSED"){
            return structures.getConfusedPhrases();
        }else if (person[key] == "SURPRISED"){
            return structures.getSurprisedPhrases();
        }
    }
    return structures.getConfusedPhrases();
}
function generateSentence(wordList, person){
    var phrase = getStructure(person);
    //return wordList;
    while (phrase.indexOf('{')!=-1){
      if (phrase.indexOf('{noun}')!=-1){
        numD = getRandomInt(0, (wordList['nouns'].length));
        console.log(numD);
        phrase = phrase.replace('{noun}',wordList['nouns'][numD]);
      } else if (phrase.indexOf('{adj}')!=-1) {
        numD = getRandomInt(0, (wordList['adjectives'].length));
        console.log(numD);

        phrase = phrase.replace('{adj}', wordList['adjectives'][numD]);
      } else if (phrase.indexOf('{verb}')!=-1) {
        numD = getRandomInt(0, (wordList['verbs'].length));
        console.log(numD);

        phrase = phrase.replace('{verb}',wordList['verbs'][numD]);
      }
    }
    return phrase;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateWordList(str, fn){
    wordpos = new WordPOS();
    wordpos.getPOS(str).then(fn);
}



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
