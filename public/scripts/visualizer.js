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

gfx = canvas.getContext('2d');

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
  fft.connect(ctx.destination);
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
  
  var data = new Uint8Array(samples);
  fft.getByteFrequencyData(data);
  gfx.fillStyle = '#08FF6B';
  for(var i=0; i<data.length; i++) {
    gfx.fillRect(i*6,canvasEl.height + 50,5,85-data[i]);
  }
}

