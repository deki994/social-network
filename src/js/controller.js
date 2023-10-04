import Validator from './Validator.js';
import * as model from './model.js';
import registracijaView from './View/registracijaView.js';
import User from './model.js';
let modelCreateUser = new User();

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

export let validator = new Validator(model.config, '#registrationForm');

async function createUser(formData) {
  try {
    await modelCreateUser.creat(formData);
  } catch (err) {
    console.log(err);
  }
}
function init() {
  registracijaView.open();
  registracijaView.pokreniValidacijuForme(validator, createUser);
}

init();
