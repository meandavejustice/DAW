/*
 * ADD FFT VISUALIZER HERE!
 * - must hookup to ALL nodes!
 */
var canvasEl = document.getElementById('fft');
var setup = false;
var samples = 128;
var context;
var gfx;
var fft;
window.visData;

gfx = canvasEl.getContext('2d');

// src should probably be a gainNode that has
// all other sources connected to it.
function connectSource(src) {
  src.connect(fft);
  setup = true;
}

function init(audioContext) {
  if (!audioContext) {
    throw new Error('You must pass an audioContext to use this module');
  }
  context = audioContext;
  fft = context.createAnalyser();
  fft.fftSize = samples;
  // fft.smoothingTimeConstant = ;
  fft.connect(context.destination);
}

function start() {
  webkitRequestAnimationFrame(update);
}

function update() {
  webkitRequestAnimationFrame(update);
  if(!setup) return;
  gfx.clearRect(0,0,800,600);
  gfx.fillStyle = '#333';
  gfx.fillRect(0,0,800,600);
  

  window.visData = new Uint8Array(fft.frequencyBinCount);
  var data = window.visData;
  fft.getByteFrequencyData(data);
  gfx.fillStyle = '#08FF6B';
  for(var i=0; i<data.length; i++) {
    gfx.fillRect(i*6,canvasEl.height + 50,5,85-data[i]);
  }
}

module.exports.init = init;
module.exports.start = start;
module.exports.connectSource = connectSource;
