/*
 * THINGS LEFT TODO HERE:
 * - Make sure to go through all todos for all included modules.
 */

var bindKeys = require('./keybindings');
var mpcInit = require('./mpc');
var control = require('./control');
// var recorder = require('./record');
var visualizer = require('./visualizer');
var wavesurfer = Object.create(WaveSurfer);
var url = '/sounds/wizard.mp3';

wavesurfer.init({
  container: document.querySelector('#wave'),
  waveColor: '#02FFC2',
  progressColor: 'orange'
});

wavesurfer.on('ready', function() {
  control(wavesurfer);
  // this works but it's annoying on linux
  // visualizer.init(wavesurfer.WebAudio.audioContext);
  // visualizer.connectSource(wavesurfer.backend);
  // visualizer.start();
  // document.querySelector('.state .s_wave span').textContent = 'READY!!';
});

wavesurfer.load(url);

window.addEventListener('WebComponentsReady', function(evt) {
  mpcInit(wavesurfer.WebAudio.audioContext);
  // recorder.init(audioContext);
  bindKeys();

  document.querySelector('.state .s_mpc span').textContent = 'READY!!';
});
