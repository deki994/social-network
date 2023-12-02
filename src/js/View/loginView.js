import { async } from 'regenerator-runtime';
import Session from './../Session.js';
let session = new Session();

class LoginView {
  _btn = document.querySelector('.login');
  _parrentElement = document.querySelector('.main-wrapper');
  _loginForm = document.querySelector('#loginForm');

  async login(dataA) {
    this._loginForm.addEventListener('submit', async function (e) {
      try {
        e.preventDefault();

        let formData = {
          email: document.querySelector('#login_email').value,
          password: document.querySelector('#login_lozinka').value,
        };

        let dataAPI = await dataA();

        let currUserAPI = dataAPI.filter(e => e.email === formData.email);
        let currEmailAPI = currUserAPI[0].email;
        let currPasswordAPI = currUserAPI[0].password;

        console.log(formData.email);
        console.log(formData.password);

        if (
          currEmailAPI === formData.email &&
          currPasswordAPI === formData.password
        ) {
          session.user_id = currUserAPI[0].id;
          session.startSession('user_id', session.user_id);

          window.location.href = 'hexa.html';
        } else {
          if (currEmailAPI !== formData.email)
            console.log('ovaj email ne postoji');
          if (currPasswordAPI !== formData.password)
            console.log('nije dobar password');
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default new LoginView();
