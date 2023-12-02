import Validator from './Validator.js';
import * as model from './model.js';
import registracijaView from './View/registracijaView.js';
import loginView from './View/loginView.js';
import User from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
let modelCreateUser = new User();
export let validator = new Validator(model.config, '#registrationForm');

async function createUser(formData) {
  try {
    await modelCreateUser.creat(formData);
  } catch (err) {
    console.log(err);
  }
}

async function loginUser() {
  let data = await modelCreateUser.getDataFromApi();
  return data;
}

function init() {
  registracijaView.open();
  registracijaView.pokreniValidacijuForme(validator, createUser);

  loginView.login(loginUser);
}

init();
