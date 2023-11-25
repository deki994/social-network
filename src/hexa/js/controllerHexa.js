import Session from '../../js/Session.js';
import * as modelH from './modelHexa.js';
import { async } from 'regenerator-runtime';

function createUserID() {
  let session = new Session();
  let idSession = session.getSession('user_id');

  window.addEventListener('load', function (e) {
    if (idSession === '') window.location.href = '/';
  });
}

function init() {
  createUserID();
  modelH.getDate();
}

init();
