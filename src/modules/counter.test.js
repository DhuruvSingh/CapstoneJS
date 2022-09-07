/**
 * @jest-environment jsdom
 */
/* eslint-disable*/

import counter from './counter.js';
// mock the DOM and the comment container
document.body.innerHTML = `
  <div class="comments-list">
    <h3>Comments</h3>
  </div>
`;
const container = document.querySelector('.comments-list');
const title = document.querySelector('h3');
// append 8 comments and test the counter function
test('counter function test', () => {
  for (let i = 0; i < 8; i += 1) {
    const newComment = document.createElement('p');
    newComment.innerHTML = 'test';
    container.appendChild(newComment);
  }
  counter(container, title, 'Comments');
  expect(title.innerHTML).toBe('Comments (8)');
});