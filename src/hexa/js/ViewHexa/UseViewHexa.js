class UseViewHexa {
  _userId;
  _btn;

  destroySession(btn, popUpHTML) {
    this._btn = btn;
    this._btn.addEventListener('click', e => {
      popUpHTML();

      document.querySelector('.black').classList.add('overlay');
      document.querySelector('.container').classList.add('hide');
    });
  }
}

export default new UseViewHexa();
