import Validator from './Validator.js';
import * as model from './model.js';
import registracijaView from './View/registracijaView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

function init() {
  registracijaView.open();
  model.pokreniValidacijuForme();
}

init();
