var canvasEl = document.querySelector('#fft canvas');
var setup = false;
var samples = 128;
var context;
var gfx;
var fft;

gfx = canvasEl.getContext('2d');

// src should probably be a gainNode that has
// all other sources connected to it.
function connectSource(backend) {
  backend.setFilter(fft);
  setup = true;
}

function init(audioContext) {
  if (!audioContext) {
    throw new Error('You must pass an audioContext to use this module');
  }
  context = audioContext;
  fft = context.createAnalyser();
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

module.exports.init = init;
module.exports.start = start;
module.exports.connectSource = connectSource;
