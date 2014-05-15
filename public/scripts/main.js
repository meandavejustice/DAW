/*
 * THINGS LEFT TODO HERE:
 * - Make sure to go through all todos for all included modules.
 */

var bindKeys = require('./keybindings');
var mpcInit = require('./mpc');
var control = require('./control');
var recorder = require('./record');
var wavesurfer = Object.create(WaveSurfer);
var url = '/sounds/wizard.mp3';

wavesurfer.init({
  container: document.querySelector('#wave'),
  waveColor: '#02FFC2',
  progressColor: 'orange'
});
wavesurfer.on('ready', function() {control(wavesurfer);});
wavesurfer.load(url);

window.addEventListener('WebComponentsReady', function(evt) {
  // pass audioContext throughout so we can do cool stuff with
  // it later.
  mpcInit(wavesurfer.audioContext);
  recorder.init(audioContext);
  bindKeys();

  document.querySelector('.state').textContent = 'READY!!';
});
