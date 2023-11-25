export default class Session {
  user_id = '';

  startSession(name, value) {
    let d = new Date();

    let today = d.getTime();
    let expires = 2 * 24 * 60 * 60 * 1000;

    d.setTime(today + expires);
    //  expires = 'expires=' + d.toUTCString();
    let new_date = d.toUTCString();

    document.cookie = `${name}=${value}; expires=${new_date}`;
  }

  getSession(cookieName) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName + '=') == 0) {
        return cookie.substring(cookieName.length + 1, cookie.length);
      }
    }
    return ''; // Ako kolačić nije pronađen
  }

  destroySession() {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf('=');
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
}
