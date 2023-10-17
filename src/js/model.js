import { async } from 'regenerator-runtime';
import Validator from './Validator.js';

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
    data = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    await this.sendDataToApi(data);

    /* return data; */
  }

  async sendDataToApi(data) {
    let JSONData = JSON.stringify(data);
    let respons = await fetch(`${this.api_url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONData,
    });
    await respons.json();
  }
}
