/*
 * THINGS LEFT TODO HERE:
 * - maybe add some extra keys for play, pause, upload, etc...
 * - add in a modal that explains keyboard shortcuts.
 */

var KeyboardJS = require('keyboardjs');
var triggerKeys = ['1', '2', '3', '4', 'q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v'];
var pads = document.querySelectorAll('audio-pad');

// jquery'd selectors for tab switching
var $tab1 = $('.nav-tabs .tab1');
var $tab2 = $('.nav-tabs .tab2');
var $tab3 = $('.nav-tabs .tab3');
var $tab4 = $('.nav-tabs .tab4');

function bindPad(elArr, key) {
  KeyboardJS.on(key, function() {
    elArr.forEach(function(el) {
      if (el.parentElement.classList.contains('active')) {
        el.play();
      }
    });
  });
}

function bindPads() {
  var padArr = pads.array();
  var bank1 = padArr.splice(0, 16);
  var bank2 = padArr.splice(0, 16);
  var bank3 = padArr.splice(0, 16);
  var bank4 = padArr.splice(0, 16);

  for (i=0; i < 16; i++) {
    var keyPads = [];
    keyPads.push(bank1[i]);
    keyPads.push(bank2[i]);
    keyPads.push(bank3[i]);
    keyPads.push(bank4[i]);
    bindPad(keyPads, triggerKeys[i]);
  }
}

function bindTabKeys() {
  KeyboardJS.on('m + one', function() {
    $tab1.tab('show');
  });

  KeyboardJS.on('m + two', function() {
    $tab2.tab('show');
  });

  KeyboardJS.on('m + three', function() {
    $tab3.tab('show');
  });

  KeyboardJS.on('m + four', function() {
    $tab4.tab('show');
  });
}

function bindKeys() {
  bindTabKeys();
  bindPads();
}

module.exports = bindKeys;
