import { async } from 'regenerator-runtime';
import Session from '../../js/Session';
let session = new Session();

export let config = {
  korisnicko_ime: { required: true, maxLength: 20 },
  register_email: { required: true, email: true },
  register_lozinka: { required: true, password: true },
  ponovi_lozinku: {
    required: true,
    password: true,
    matching: 'register_lozinka',
  },
};

export async function updateMockApiDate(newData) {
  let id = session.getSession('user_id');
  try {
    let res = await fetch(
      `https://650eadc854d18aabfe995dda.mockapi.io/user/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      }
    );
    await res.json();
    // if (!res.ok) throw new Error('greska prilikom brisanja');
  } catch (err) {
    console.log(err);
  }
}

export async function deletData() {
  let id = session.getSession('user_id');
  try {
    let res = await fetch(
      `https://650eadc854d18aabfe995dda.mockapi.io/user/${id}`,
      { method: 'DELETE' }
    );
    if (!res.ok) throw new Error('greska prilikom brisanja');

    session.destroySession();
  } catch (err) {
    console.log(err);
  }
}

export async function getDate() {
  let res = await fetch(`https://650eadc854d18aabfe995dda.mockapi.io/user`);
  let date = await res.json();

  let id = session.getSession('user_id'); // POZOVI OVAJ EMAIL COOKIE
  let currentUser = date.filter(e => e.id === id); // FILTRIRAJ IZ MOCKAPIJA EMAIL KOJI JE JEDNAK EMAIL--U IZ  COOKIE-JA

  // OVDE DOLE SMO IZVUKLI IZE IZ MOCK APIJA I UBACILI GA U WELCOMTE DIV:
  let currentName = currentUser[0].username;

  let userName = document.querySelector('#username');
  userName.textContent = `${currentName}`;

  let email = document.querySelector('#email');
  email.textContent = `${currentUser[0].email}`;

  return date;
}

async function sendDataToApi(data) {
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
