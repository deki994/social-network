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

export let validator = new Validator(config, '#registrationForm');

export function pokreniValidacijuForme() {
  document.querySelector('#registrationForm').addEventListener('submit', e => {
    e.preventDefault();

    if (validator.validationPassed()) {
      console.log('dobro  je sve');
    } else {
      console.log('nije dobro nesto');
    }
  });
}
