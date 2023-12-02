import { async } from 'regenerator-runtime';

class UseHexaBTNs {
  _btn;
  _parent;
  _userId;

  // definise .questionPopUp div:
  popUpHTML(session) {
    let parent = document.querySelector('.questionPopUp');
    parent.innerHTML = '';

    let markUp = `
      <p>Da li ste sigurni da želite da se odjavite?</p>
      <button class="yes">Da</button>
      <button class="no">Ne</button>
  `;

    parent.insertAdjacentHTML('afterbegin', markUp);
    parent.style.display = 'block';

    this.questionDestroy(parent, session);
  }

  gatherFormData() {
    const formData = {
      username: document.querySelector('#korisnicko_ime').value,
      email: document.querySelector('.emailAddres').value,
      password: document.querySelector('#lozinka').value,
      newPassword: document.querySelector('#ponovi_lozinku').value,
    };

    return formData;
  }

  //Definise radnju koja se desava kada se klikne na da ili ne u .questionPopUp clasi diva:
  questionDestroy(parent, session) {
    parent.addEventListener('click', e => {
      e.preventDefault();

      parent.style.display = 'block';

      let target = e.target;

      if (target.classList.contains('yes')) {
        parent.style.display = 'none';
        session.destroySession();
        window.location.href = '/';
        document.querySelector('.black').classList.remove('overlay');
        document.querySelector('.container').classList.remove('hide');
      }
      if (target.classList.contains('no')) {
        parent.style.display = 'none';
        document.querySelector('.black').classList.remove('overlay');
        document.querySelector('.container').classList.remove('hide');
      }
    });
  }

  editAccount(data) {
    let btn = document.querySelector('#editAccount');
    btn.addEventListener('click', e => {
      e.preventDefault();

      document.querySelector('.custom-modal').style.display = 'block';

      this.close();
    });
  }

  deleteAccount(killSession, data) {
    let deleteBTN = document.querySelector('.deleteProfil');

    deleteBTN.addEventListener('click', async e => {
      let dataAPI = await data();
      let formData = this.gatherFormData();

      let foundElement = dataAPI.find(
        element => element.password === formData.password
      );

      if (formData.password === '') {
        alert('moras unijeti sifru');
      } else {
        if (foundElement && formData.password) {
          await killSession();
          window.location.href = '/';
        } else {
          alert('Moraš uneti tačnu šifru.');
        }
      }
    });

    /*  if (dataAPI.password === formData.password && formData.password !== '') {
        console.log(apiPassword);
        // killSession();
      } else {
        console.log('moras ukucati tacnu sifru');
      } */
  }

  close() {
    let x = document.querySelector('#closeModal');
    x.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('.custom-modal').style.display = 'none';
    });
  }

  pokreniValidacijuForme(data, update, session) {
    let form = document.querySelector('#registrationForm');

    form.addEventListener('submit', async e => {
      e.preventDefault();

      let dataAPI = await data();

      let curSession = session.getSession('user_id');
      let curProfil = dataAPI.filter(e => e.id === curSession);

      let formData = this.gatherFormData();
      console.log(formData);
      console.log(dataAPI);

      // .every metoda ce nam provjeriti da li su svi elementi mockAPI-ja razliciti od nase vrijednosti email-a iz forme:
      let checkAPI = dataAPI.every(e => e.email !== formData.email);

      let apiPassword = curProfil[0].password;

      if (
        apiPassword === formData.password &&
        formData.username !== '' &&
        formData.email !== '' &&
        formData.newPassword !== '' &&
        checkAPI
      ) {
        formData.password = formData.newPassword;
        await update(formData);
        window.location.href = 'hexa.html';
      } else {
        console.log('nesto nisi dobro ukucao uu formi');
      }
    });
  }

  profilImage() {
    let img = document.querySelector('.profile');
    img.addEventListener('click', e => {
      e.preventDefault();

      let question = confirm('Da li zelite da promjenite profilnu sliku?');
      if (question) {
        // Prikazivanje dijaloga za izbor datoteke
        const input = document.createElement('input');
        console.log(input);
        input.type = 'file';
        input.accept = 'image/*';

        input.addEventListener('change', function () {
          const selectedFile = input.files[0];

          if (selectedFile) {
            // Ažuriranje atributa src na osnovu izabrane datoteke
            const imageUrl = URL.createObjectURL(selectedFile);
            img.src = imageUrl;
          }
        });

        // Kliknite na input kako biste otvorili dijalog za izbor datoteke
        input.click();
      }
    });
  }
}

export default new UseHexaBTNs();
