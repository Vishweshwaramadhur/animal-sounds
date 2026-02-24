/* ==========================================================================
   SoundZoo — script.js
   Pure vanilla JavaScript | No frameworks | No external libraries
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   Custom Sounds Store — holds uploaded audio data URLs keyed by animal name
   -------------------------------------------------------------------------- */

var customSounds = {};

/* --------------------------------------------------------------------------
   Data — Animals
   -------------------------------------------------------------------------- */

var ANIMALS = [
  { name: 'Dog',      sound: 'Bow Bow',       emoji: '🐶' },
  { name: 'Cat',      sound: 'Meow Meow',     emoji: '🐱' },
  { name: 'Cow',      sound: 'Ambaa',         emoji: '🐄' },
  { name: 'Lion',     sound: 'Roar',          emoji: '🦁' },
  { name: 'Tiger',    sound: 'Grrr',          emoji: '🐯' },
  { name: 'Elephant', sound: 'Pawoo',         emoji: '🐘' },
  { name: 'Horse',    sound: 'Neigh',         emoji: '🐴' },
  { name: 'Monkey',   sound: 'Oo Oo Aa Aa',  emoji: '🐒' },
  { name: 'Goat',     sound: 'Maa Maa',       emoji: '🐐' },
  { name: 'Sheep',    sound: 'Baa Baa',       emoji: '🐑' },
  { name: 'Pig',      sound: 'Oink Oink',     emoji: '🐷' },
  { name: 'Donkey',   sound: 'Hee Haw',       emoji: '🫏' },
  { name: 'Camel',    sound: 'Grunt',         emoji: '🐪' },
  { name: 'Bear',     sound: 'Growl',         emoji: '🐻' },
  { name: 'Wolf',     sound: 'Howl',          emoji: '🐺' }
];

/* --------------------------------------------------------------------------
   Data — Birds
   -------------------------------------------------------------------------- */

var BIRDS = [
  { name: 'Crow',    sound: 'Caw Caw',      emoji: '🐦' },
  { name: 'Parrot',  sound: 'Squawk',       emoji: '🦜' },
  { name: 'Owl',     sound: 'Hoot Hoot',    emoji: '🦉' },
  { name: 'Peacock', sound: 'May-Awe',      emoji: '🦚' },
  { name: 'Duck',    sound: 'Quack Quack',  emoji: '🦆' },
  { name: 'Hen',     sound: 'Cluck Cluck',  emoji: '🐔' },
  { name: 'Eagle',   sound: 'Screech',      emoji: '🦅' },
  { name: 'Sparrow', sound: 'Chirp Chirp',  emoji: '🐤' },
  { name: 'Pigeon',  sound: 'Coo Coo',      emoji: '🕊️' }
];

/* --------------------------------------------------------------------------
   Card Color Gradients — Animals (15 unique gradients)
   -------------------------------------------------------------------------- */

var ANIMAL_COLORS = [
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
  'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
  'linear-gradient(135deg, #fd7043 0%, #ff8a65 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
];

/* --------------------------------------------------------------------------
   Card Color Gradients — Birds (9 unique gradients)
   -------------------------------------------------------------------------- */

var BIRD_COLORS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #667eea 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
];

/* --------------------------------------------------------------------------
   Speech Synthesis — speak the animal sound aloud
   -------------------------------------------------------------------------- */

/**
 * Plays the sound for a card.
 * Uses uploaded MP3 if available, otherwise falls back to SpeechSynthesis.
 *
 * @param {string}      text     - The sound text to speak (e.g. "Bow Bow").
 * @param {HTMLElement} cardEl   - The card element for visual feedback.
 * @param {string}      itemName - Animal/bird name used to look up custom sound.
 */
function speakSound(text, cardEl, itemName) {
  /* --- Play uploaded real sound if available --- */
  if (itemName && customSounds[itemName]) {
    var audio = new Audio(customSounds[itemName]);
    cardEl.classList.add('playing');
    audio.onended = function () { cardEl.classList.remove('playing'); };
    audio.onerror = function () { cardEl.classList.remove('playing'); };
    audio.play();
    return;
  }

  /* --- Fallback: SpeechSynthesis --- */
  if (!('speechSynthesis' in window)) {
    alert('Your browser does not support Speech Synthesis.\nPlease open this page in Chrome or Edge.');
    return;
  }

  /* Stop any speech already in progress */
  window.speechSynthesis.cancel();

  var utterance = new SpeechSynthesisUtterance(text);
  utterance.rate   = 0.85;  /* slightly slower for clarity */
  utterance.pitch  = 1.1;
  utterance.volume = 1.0;

  utterance.onstart = function () { cardEl.classList.add('playing'); };
  utterance.onend   = function () { cardEl.classList.remove('playing'); };
  utterance.onerror = function () { cardEl.classList.remove('playing'); };

  window.speechSynthesis.speak(utterance);
}

/* --------------------------------------------------------------------------
   Card Factory — build one card DOM element
   -------------------------------------------------------------------------- */

/**
 * Creates a clickable sound card element.
 *
 * @param {{ name: string, sound: string, emoji: string }} item
 * @param {string} gradient - CSS gradient for the card background.
 * @returns {HTMLElement}
 */
function createCard(item, gradient) {
  var card = document.createElement('div');
  card.className = 'sound-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', item.name + ' — click to hear ' + item.sound);
  card.style.background = gradient;

  card.innerHTML =
    '<button class="edit-sound-btn" title="Upload real sound (MP3)" aria-label="Upload custom sound for ' + item.name + '">🎵</button>' +
    '<input type="file" class="sound-upload-input" accept="audio/*" aria-hidden="true">' +
    '<span class="card-emoji" aria-hidden="true">' + item.emoji + '</span>' +
    '<p class="card-name">'  + item.name  + '</p>' +
    '<p class="card-sound">' + item.sound + '</p>' +
    '<div class="card-sound-wave" aria-hidden="true">' +
      '<span class="wave-bar"></span>' +
      '<span class="wave-bar"></span>' +
      '<span class="wave-bar"></span>' +
      '<span class="wave-bar"></span>' +
      '<span class="wave-bar"></span>' +
    '</div>';

  var editBtn    = card.querySelector('.edit-sound-btn');
  var soundInput = card.querySelector('.sound-upload-input');

  /* Edit button — open file picker without triggering card click */
  editBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    soundInput.click();
  });

  /* File selected — read and store custom sound */
  soundInput.addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please select a valid audio file (MP3, WAV, OGG, etc.).');
      soundInput.value = '';
      return;
    }

    var reader = new FileReader();

    reader.onload = function (ev) {
      customSounds[item.name] = ev.target.result;
      card.classList.add('has-custom-sound');
      editBtn.textContent = '✅';
      editBtn.title = 'Real sound loaded! Click to replace';
    };

    reader.onerror = function () {
      alert('Could not read the file. Please try again.');
      soundInput.value = '';
    };

    reader.readAsDataURL(file);
  });

  /* Mouse / touch click */
  card.addEventListener('click', function () {
    speakSound(item.sound, card, item.name);
  });

  /* Keyboard accessibility: Enter or Space bar */
  card.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      speakSound(item.sound, card, item.name);
    }
  });

  return card;
}

/* --------------------------------------------------------------------------
   Render — populate a grid container with cards
   -------------------------------------------------------------------------- */

/**
 * Generates cards for each item and appends them to the target container.
 *
 * @param {Array}  dataArray   - Array of { name, sound, emoji } objects.
 * @param {Array}  colorArray  - Array of CSS gradient strings.
 * @param {string} containerId - ID of the grid container element.
 */
function renderCards(dataArray, colorArray, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  /* Use a DocumentFragment for a single DOM reflow */
  var fragment = document.createDocumentFragment();

  dataArray.forEach(function (item, index) {
    var gradient = colorArray[index % colorArray.length];
    var card     = createCard(item, gradient);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/* --------------------------------------------------------------------------
   Image Upload — preview the uploaded image
   -------------------------------------------------------------------------- */

function initImageUpload() {
  var input     = document.getElementById('imageUpload');
  var preview   = document.getElementById('imagePreview');
  var wrapper   = document.getElementById('imagePreviewWrapper');
  var removeBtn = document.getElementById('removeImageBtn');

  if (!input || !preview || !wrapper || !removeBtn) return;

  /* Show preview when user selects an image */
  input.addEventListener('change', function (event) {
    var file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, GIF, WebP, etc.).');
      input.value = '';
      return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      wrapper.classList.add('visible');
    };

    reader.onerror = function () {
      alert('Could not read the file. Please try again.');
      input.value = '';
    };

    reader.readAsDataURL(file);
  });

  /* Clear preview when user clicks Remove */
  removeBtn.addEventListener('click', function () {
    preview.src = '';
    wrapper.classList.remove('visible');
    input.value = '';
  });
}

/* --------------------------------------------------------------------------
   Init — run after the DOM is fully loaded
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {
  renderCards(ANIMALS, ANIMAL_COLORS, 'animalGrid');
  renderCards(BIRDS,   BIRD_COLORS,   'birdGrid');
  initImageUpload();
});
