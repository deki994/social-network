import Validator from './hecaValidation.js';

import Session from '../../js/Session.js';
import * as modelH from './modelHexa.js';
import useViewHexa from './ViewHexa/UseViewHexa.js';
import useHexaBTNs from './ViewHexa/UseHexaBTNs.js';
import { async } from 'regenerator-runtime';
let session = new Session();
let validator = new Validator(modelH.config, '#registrationForm');

function createUserID() {
  let idSession = session.getSession('user_id');

  window.addEventListener('load', function (e) {
    if (idSession === '') window.location.href = '/';
  });
}

function popUp() {
  return useHexaBTNs.popUpHTML(session);
}

async function getDataAPI() {
  let data = await modelH.getDate();
  return data;
}

async function kilSession() {
  await modelH.deletData();
}

async function updateData(data) {
  await modelH.updateMockApiDate(data);
}

function init() {
  createUserID();
  modelH.getDate();
  useViewHexa.destroySession(document.querySelector('#logOut'), popUp);

  useHexaBTNs.editAccount();
  useHexaBTNs.pokreniValidacijuForme(getDataAPI, updateData, session);
  useHexaBTNs.deleteAccount(kilSession, getDataAPI);
  useHexaBTNs.profilImage();
}

init();
