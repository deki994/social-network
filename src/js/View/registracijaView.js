import { async } from 'regenerator-runtime';

class RegistracijaView {
  _btn = document.querySelector('#registracija');
  _parrentEl = document.querySelector('.custom-modal');
  _forma = document.querySelector('#registrationForm');

  open() {
    this._btn.addEventListener('click', this.openBind.bind(this));
    this.close();
  }
  openBind(e) {
    e.preventDefault();
    this._parrentEl.style.display = 'block';
  }

  close() {
    let x = document.querySelector('#closeModal');

    x.addEventListener('click', () => (this._parrentEl.style.display = 'none'));
  }

  gatherFormData() {
    const formData = {
      username: document.querySelector('#korisnicko_ime').value,
      email: document.querySelector('#email').value,
      password: document.querySelector('#lozinka').value,
    };

    return formData;
  }

  pokreniValidacijuForme(validator, data) {
    document
      .querySelector('#registrationForm')
      .addEventListener('submit', async e => {
        e.preventDefault();

        if (validator.validationPassed()) {
          let formData = this.gatherFormData();
          await data(formData);
        } else {
          console.log('nije dobro nesto');
        }
      });
  }
}

export default new RegistracijaView();
