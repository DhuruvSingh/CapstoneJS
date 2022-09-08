/**
 * @jest-environment jsdom
 */
/* eslint-disable*/

test('Test for number of items', async () => {
  // mocking the HTML
  document.body.innerHTML = `<header>
    <div class="logo">MovieTV Logo</div>
    <div class="movies">Movies</div>  
    <div class="latest">latest</div>
    <div class="old-col">old collections</div>
  </header>
  <section class="shows">
    <h2>Upcoming Shows</h2>
    <div class="series"></div>
  </section>`;
  let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const section = document.querySelector('.series');
  list.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `test ${item}`;
    section.appendChild(div);
  });
  const movies = document.querySelector('.movies');
  movies.innerHTML = `Series (${section.childElementCount})`;
  expect(movies.innerHTML).toBe('Series (16)');
});