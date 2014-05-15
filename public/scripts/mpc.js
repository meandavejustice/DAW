/*
 * THINGS TODO HERE:
 * - add effects to pads. (should probably not live on actual component)
 * - style for while pad is active.
 * - progress while loading initially.
 * - gainControl
 * - track title on hover maybe?
 * - draggable?
 * - modal help?
 */
var pads = document.querySelectorAll('audio-pad');
var basePath = 'sounds/';
var freshKit = require('../sounds/freshKit.js');
var context;

function setPads(idx) {
  if (idx > pads.length - 1) return;
  pads[idx].audioContext = context;

  var trackName = freshKit[idx];
  pads[idx].url = basePath + trackName;
  pads[idx].loadSilent();

  pads[idx].addEventListener('sound:loaded', function() {
    console.log('loaded!');
  }, false);

  setPads(idx + 1);
}

function init(audioContext) {
  context = audioContext;
  setPads(0);
}

module.exports = init;

// var seenIndex = [];

// function getRandomIndex() {
//   return Math.floor(Math.random()*freshKit.length - 1);
// }

// function getUniqIndex() {
//   var randomIndex = getRandomIndex();

//   // reset if we fill up the seenIndex
//   if (seenIndex.length === freshKit.length) seenIndex = [];

//   if (seenIndex.indexOf(randomIndex) === -1) {
//     seenIndex.push(randomIndex);
//     return randomIndex;
//   } else {
//     getUniqIndex();
//   }
// }
