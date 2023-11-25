import { async } from 'regenerator-runtime';
import Validator from './Validator.js';

import Session from './Session.js';
let session = new Session();

let userCokie = session.getSession('user_id');
if (userCokie !== '') window.location.href = 'hexa.html';

export let config = {
  korisnicko_ime: {
    required: true,
    minLength: 5,
    maxLength: 40,
  },

  register_email: {
    required: true,
    email: true,
    minLength: 5,
    maxLength: 40,
  },

  register_lozinka: {
    required: true,
    minLength: 5,
    maxLength: 20,
    matching: 'ponovi_lozinku',
  },

  ponovi_lozinku: {
    required: true,
    minLength: 5,
    maxLength: 20,
    matching: 'register_lozinka',
  },
};

export default class User {
  user_id = '';
  username = '';
  email = '';
  password = '';
  api_url = 'https://650eadc854d18aabfe995dda.mockapi.io';

  async creat(data) {
    try {
      data = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      let getApiData = await this.getDataFromApi();
      let currentUser = getApiData.filter(e => e.email === data.email);

      if (currentUser.length > 0) {
        console.log('taj nalog vec postoji,samo se uloguj');
      } else {
        // saljemo podatke iz forme na mockAPI:
        await this.sendDataToApi(data);

        // refresujemo podatke sa mockAPI-ja da program zna ako ima novihh podataka:
        getApiData = await this.getDataFromApi();
        currentUser = getApiData.filter(e => e.email === data.email);

        // kreiranje cookie-ja za user-id:
        session.user_id = currentUser[0].id;
        session.startSession('user_id', session.user_id);

        window.location.href = `hexa.html`;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async sendDataToApi(data) {
    try {
      let JSONData = JSON.stringify(data);
      let respons = await fetch(`${this.api_url}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONData,
      });
      await respons.json();
    } catch (err) {
      console.log(err);
    }
  }

  async getDataFromApi() {
    try {
      let res = await fetch(`${this.api_url}/user`);
      let data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
