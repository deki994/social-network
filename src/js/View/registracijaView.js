import Validator from '../Validator.js';

class RegistracijaView {
  _btn = document.querySelector('#registracija');
  _parrentEl = document.querySelector('.custom-modal');

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
}

export default new RegistracijaView();
