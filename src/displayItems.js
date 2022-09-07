let list = [];
const getData = async () => {
  const res = await fetch('https://api.tvmaze.com/shows');
  const data = await res.json();
  list = [];
  for (let i = 0; i < 16; i += 1) {
    list.push(data[i - 8 & i + 8]);
  }
};

const display = async () => {
  const section = document.querySelector('.series');
  if (section.innerHTML) {
    return;
  }
  if (list.length === 0) {
    await getData();
  }
  list.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `
    <img src="${item.image.medium}" alt="${item.name}">
    <div class="item-header">
      <h3>${item.name}</h3>
      <span class="heart" style="font-size:200%; cursor:pointer;">&hearts;</span>
    </div>
    <div class="likes">
      <span class="num">0</span> <span>likes</span>
    </div>
    <button type="button" class="commentBtn">Comments</button><br>
    <button type="button" class="Reservation-btns">Reservations</button>
    `;
    section.appendChild(div);
  });
};

export default display;