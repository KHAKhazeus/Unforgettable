var $ = function (sel) {
  return document.querySelector(sel);
};
var $All = function (sel) {
  return document.querySelectorAll(sel);
};
var makeArray = function (likeArray) {
  var array = [];
  for (var i = 0; i < likeArray.length; ++i) {
    array.push(likeArray[i]);
  }
  return array;
};

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

var animationURL = ["/eyes.html", "/diary.html"]

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function randomAnimationhref(){
  return animationURL[getRndInteger(0, animationURL.length)];
}