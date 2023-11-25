import Session from '../../js/Session';
let session = new Session();

export async function getDate() {
  let res = await fetch(`https://650eadc854d18aabfe995dda.mockapi.io/user`);
  let date = await res.json();

  let id = session.getSession('user_id'); // POZOVI OVAJ EMAIL COOKIE
  console.log(id);
  let currentUser = date.filter(e => e.id === id); // FILTRIRAJ IZ MOCKAPIJA EMAIL KOJI JE JEDNAK EMAIL--U IZ  COOKIE-JA

  // OVDE DOLE SMO IZVUKLI IZE IZ MOCK APIJA I UBACILI GA U WELCOMTE DIV:
  let currentName = currentUser[0].username;

  let welcomeText = document.querySelector('.welcome');
  welcomeText.textContent = `Welcom ${currentName}`.toUpperCase();
}
