<script>
fuction getHappyPhrases(){
  var emotionArr = ['I had a {adj} day today with my {noun}', 'We {verb} today, it was so {adj}', 'These {noun} and so {adj} and {adj}'];
  num = Math.trunc(Math.random()*3);
  return emotionArr[num];
}
fuction getSadPhrases(){
  var emotionArr = ["I act {adj}, but deep down I'm really {adj}", 'I always {verb} everything.', 'The worst part off {noun}, if how it makes me feel.'];
  num = Math.trunc(Math.random()*3);
  return emotionArr[num];
}
fuction getAngryPhrases(){
  var emotionArr = ['No one gives a {noun}.', 'He is such a {adj} and {adj}', 'This {noun} pisses me off.'];
  num = Math.trunc(Math.random()*3);
  return emotionArr[num];
}
fuction getConfusedPhrases(){
  var emotionArr = ['Wait? I though {adj} was {adj}.', "Isn't {noun} really a {noun}?", 'Why does she {verb}?'];
  num = Math.trunc(Math.random()*3);
  return emotionArr[num];
}
fuction getDisgustedPhrases(){
  var emotionArr = ['Ugghh...', 'EW! That {noun} is so {adj}',  'Umm? Did they just {verb}'];
  num = Math.trunc(Math.random()*3);
  return emotionArr[num];
}
fuction getSurprisedPhrases(){
  var emotionArr = ['Shit! that {noun} {verb} out of nowhere', 'Wow! That is a {adj} {noun}', 'Trump is President!'];
  num = Math.trunc(Math.random()*3);
  return emotionArr[num];
}
fuction getCalmPhrases(){
  var emotionArr = ['keep calm and {verb}', 'Its a good day to {verb} with a {noun}', 'Today is such a {adj} day for a {noun}'];
  num = Math.trunc(Math.random()*3);
  return emotionArr[num];
}
</script>
