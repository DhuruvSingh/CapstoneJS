class Reservations {
  constructor() {
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/sbQptczQF0U2Q2jYZYzk/reservations';
    this.reservations = [];
  }

  async addReserve(id, name, start, end) {
    await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: name,
        date_start: start,
        date_end: end,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  async getReserves(id) {
    await fetch(`${this.url}?item_id=${id}`)
      .then((response) => response.text())
      .then((data) => {
        if (data === '') {
          this.reservations = [];
        } else {
          this.reservations = JSON.parse(data);
        }
      });
    return this.reservations;
  }
}

const reservations = new Reservations();

let list = [];
const getData = async () => {
  const res = await fetch('https://api.tvmaze.com/shows');
  const data = await res.json();
  list = [];
  for (let i = 0; i < 16; i += 1) {
    list.push(data[i + 8]);
  }
};

const activateReservations = async () => {
  await getData();
  const buttons = document.querySelectorAll('.reservation-btns');
  const reservationsSection = document.querySelector('.reservations');
  const screen = document.querySelector('.screen');
  buttons.forEach((button, id) => {
    button.addEventListener('click', () => {
      console.log(`button ${id} clicked`);
      // creating elements
      const img = document.createElement('img');
      const closeBtn = document.createElement('button');
      const textContent = document.createElement('div');
      const info = document.createElement('div');
      const title = document.createElement('h2');
      const tag = document.createElement('span');
      const tag02 = document.createElement('span');
      const tag03 = document.createElement('span');
      const tag04 = document.createElement('span');
      const reservationsBox = document.createElement('div');
      const reservationsTitle = document.createElement('h3');
      const reservationForm = document.createElement('form');
      const reservationMaker = document.createElement('input');
      const startDate = document.createElement('input');
      const endDate = document.createElement('input');
      const submit = document.createElement('button');
      const reservationList = document.createElement('div');
      const listTitle = document.createElement('h3');
      // adding attributes
      img.src = list[id].image.original;
      img.alt = `${list[id].name} poster image`;
      closeBtn.classList.add('closeBtn');
      closeBtn.innerHTML = '&#10008;';
      closeBtn.type = 'button';
      textContent.classList.add('text-content');
      info.classList.add('info');
      title.innerHTML = list[id].name;
      tag.innerHTML = `<strong>Genres:</strong> ${list[id].genres.join(', ')}`;
      tag02.innerHTML = `<strong>Rating:</strong> ${list[id].rating.average}`;
      tag03.innerHTML = `<strong>Primered:</strong> ${list[id].premiered}`;
      tag04.innerHTML = `<strong>Runtime:</strong> ${list[id].runtime} minutes`;
      reservationsBox.classList.add('reservations-section');
      reservationsTitle.innerHTML = 'Add a Reservation';
      reservationForm.classList.add('reservation-form');
      reservationMaker.id = 'reservationMaker';
      reservationMaker.setAttribute('type', 'text');
      reservationMaker.placeholder = 'Your name';
      reservationMaker.attributes.required = true;
      startDate.setAttribute('type', 'date');
      startDate.id = 'start-date';
      startDate.attributes.required = true;
      endDate.setAttribute('type', 'date');
      endDate.id = 'end-date';
      endDate.attributes.required = true;
      submit.type = 'submit';
      submit.innerHTML = 'Reserve';
      reservationList.classList.add('reservation-list');
      listTitle.innerHTML = 'Reservations';
      reservationsSection.classList.remove('hidden');
      screen.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      // appending elements
      reservationsSection.innerHTML = '';
      reservationsSection.appendChild(closeBtn);
      info.appendChild(title);
      info.appendChild(tag);
      info.appendChild(tag02);
      info.appendChild(tag03);
      info.appendChild(tag04);
      reservationForm.append(reservationMaker, startDate, endDate, submit);
      reservationList.appendChild(listTitle);
      reservationsBox.append(reservationsTitle, reservationForm, reservationList);
      textContent.append(info, reservationsBox);
      reservationsSection.append(img, textContent);

      closeBtn.addEventListener('click', () => {
        reservationsSection.classList.add('hidden');
        screen.classList.add('hidden');
        document.body.style.overflow = 'auto';
      });

      reservations.getReserves(id)
        .then((data) => {
          data.forEach((item) => {
            const newReservation = document.createElement('p');
            newReservation.innerHTML = `${item.date_start} - ${item.date_end} by ${item.username}.`;
            reservationList.appendChild(newReservation);
          });
        });

      submit.addEventListener('click', (e) => {
        e.preventDefault();
        reservations.addReserve(id, reservationMaker.value, startDate.value, endDate.value)
          .then(() => {
            reservations.getReserves(id)
              .then((data) => {
                reservationList.innerHTML = '';
                reservationList.appendChild(listTitle);
                data.forEach((item) => {
                  const newReservation = document.createElement('p');
                  newReservation.innerHTML = `${item.date_start} - ${item.date_end} by ${item.username}.`;
                  reservationList.appendChild(newReservation);
                });
              });
          });
          reservationMaker.value = '';
          startDate.value = '';
          endDate.value = '';
      });
    });
  });
};

export default activateReservations;
