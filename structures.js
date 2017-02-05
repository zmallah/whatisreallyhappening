
module.exports = {
  getHappyPhrases: function () {
      var emotionArr = ['I had a {adj} day today with my {noun}', 'We {verb} today, it was so {adj}', 'These {noun} and so {adj} and {adj}'];
      num = Math.trunc(Math.random()*3);
      return emotionArr[num];
  },
  getSadPhrases: function () {
    var emotionArr = ["I act {adj}, but deep down I'm really {adj}", 'I always {verb} everything.', 'The worst part off {noun}, if how it makes me feel.'];
    num = Math.trunc(Math.random()*3);
    return emotionArr[num];
  },
  getAngryPhrases: function () {
    var emotionArr = ['No one gives a {noun}.', 'He is such a {adj} and {adj}', 'This {noun} pisses me off.'];
    num = Math.trunc(Math.random()*3);
    return emotionArr[num];
  },
  getConfusedPhrases: function () {
    var emotionArr = ['Wait? I though {adj} was {adj}.', "Isn't {noun} really a {noun}?", 'Why does she {verb}?'];
    num = Math.trunc(Math.random()*3);
    return emotionArr[num];
  },
  getDisgustedPhrases: function () {
    var emotionArr = ['Ugghh...', 'EW! That {noun} is so {adj}',  'Umm? Did they just {verb}'];
    num = Math.trunc(Math.random()*3);
    return emotionArr[num];
  },
  getSurprisedPhrases: function () {
    var emotionArr = ['Shit! that {noun} {verb} out of nowhere', 'Wow! That is a {adj} {noun}', 'Trump is President!'];
    num = Math.trunc(Math.random()*3);
    return emotionArr[num];
  },
  getCalmPhrases: function () {
    var emotionArr = ['keep calm and {verb}', 'Its a good day to {verb} with a {noun}', 'Today is such a {adj} day for a {noun}'];
    num = Math.trunc(Math.random()*3);
    return emotionArr[num];
  },

};
