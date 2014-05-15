/*
 * THINGS TODO HERE:
 * - pull out fileEl since uploads will get a little heavier
 * - file uploads.
 * - drag n drop uploads test on macbook.
 * - style volume control
 * - make volume control update while sliding instead
 * of waiting for release click.
 * - make prettier interface for controls.
 */


var playEl = document.querySelector('.control .play');
var pauseEl = document.querySelector('.control .pause');
var stopEl = document.querySelector('.control .stop');
var forwardEl = document.querySelector('.control .forward');
var backEl = document.querySelector('.control .back');
var volumeEl = document.querySelector('.control .volume');
var volValue = document.querySelector('.control .volValue');
var fileEl = document.querySelector('.control .upload');

module.exports = function(wave) {
  if (!wave) throw new Error('need to pass an instance of wavesurfer');
  addListeners(wave);
};

function addListeners(wave) {
  playEl.addEventListener('click', function(ev) {
    wave.play();
  }, false);

  pauseEl.addEventListener('click', function(ev) {
    wave.pause();
  }, false);

  stopEl.addEventListener('click', function(ev) {
    wave.stop();
  }, false);

  forwardEl.addEventListener('click', function(ev) {
    wave.skipForward();
  }, false);

  backEl.addEventListener('click', function(ev) {
    wave.skipBackward();
  }, false);

  volumeEl.addEventListener('change', function(ev) {
    var val = parseInt(ev.target.value, 10);
    volValue.textContent = val;
    wave.setVolume(val*0.01);
  });

  fileEl.addEventListener('change', function(ev) {
    console.log(ev);
  });
}
