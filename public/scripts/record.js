/*
 * THINGS LEFT TODO HERE:
 * - CreateUserMedia working correctly when hitting record.
 * - stopping recording and proper ui for such a thing
 * - passing all sources from audio-pads to a gainNode and passing
 * the master gainNode to the source to recorder if mpc checkbox 
 * is enabled.
 * - ability to automatically playback recording _while_ viewing
 * the waveform. (we may need to upload to create a real url)
 * - create a proper download link.
 */

var pads = querySelectorAll('.pads');
var recordEl = document.querySelector('.control .record button');
var checkMic = document.querySelector('input[name="mic"]');
var checkMpc = document.querySelector('input[name="mpc"]');
var gainNode = audioContext.createGainNode();
var context;

recordEl.addEventListener('click', function(ev) {
  var opts = {
    mic: checkMic.checked,
    mpc: checkMpc.checked
  };
  init(opts);
  start(opts);
}, false);

function createDownloadLink() {
  recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);

    // fix this shit
    var li = document.createElement('li');
    var au = document.createElement('audio');
    var hf = document.createElement('a');
    
    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = new Date().toISOString() + '.wav';
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(hf);
    recordingslist.appendChild(li);
  });
}

function startUserMedia(stream) {
  var input = context.createMediaStreamSource(stream);
  input.connect(context.destination);
  recorder = new Recorder(input);
}

function checkUserMedia() {
  navigator.getUserMedia({audio: true}, startUserMedia, function(err) {
    console.warn('No audio input', err);
  });
}

function reset(obj) {

}

function init(audioContext) {
  if (!audioContext) {
    throw new Error('You must pass an audioContext to use the recorder module');
  }
  context = audioContext;
}

function start() {
  rec.record();
}

function stop() {
  rec.stop();
}

var padArr = pads.array();
padArr.forEach(function(pad) {
  pad.source.connect(gainNode);
});

module.exports.start = start;
module.exports.stop = stop;
module.exports.init = init;



var source = context.createBufferSource();
var gainNode = context.createGainNode();
