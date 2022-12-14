import counter from './counter.js';

class Comments {
  constructor() {
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/sbQptczQF0U2Q2jYZYzk/comments';
    this.comments = [];
  }

  async addComment(id, name, newComment) {
    await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: name,
        comment: newComment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  async getComments(id) {
    await fetch(`${this.url}?item_id=${id}`)
      .then((response) => response.text())
      .then((data) => {
        if (JSON.parse(data).error) {
          this.comments = [];
        } else {
          this.comments = JSON.parse(data);
        }
      });
    return this.comments;
  }
}

const comments = new Comments();

let list = [];
const getData = async () => {
  const res = await fetch('https://api.tvmaze.com/shows');
  const data = await res.json();
  list = [];
  for (let i = 0; i < 16; i += 1) {
    list.push(data[i + 8]);
  }
};

const activateComments = async () => {
  await getData();
  const buttons = document.querySelectorAll('.commentBtn');
  const commentSection = document.querySelector('.comments');
  const screen = document.querySelector('.screen');
  buttons.forEach((button, id) => {
    button.addEventListener('click', () => {
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
      const commentsBox = document.createElement('div');
      const commentsTitle = document.createElement('h3');
      const commentForm = document.createElement('form');
      const commenter = document.createElement('input');
      const comment = document.createElement('textarea');
      const submit = document.createElement('button');
      const commentList = document.createElement('div');
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
      commentsBox.classList.add('comments-section');
      commentsTitle.innerHTML = 'Add a Comment';
      commentForm.classList.add('comment-form');
      commenter.id = 'commenter';
      commenter.setAttribute('type', 'text');
      commenter.placeholder = 'Your name';
      commenter.attributes.required = true;
      comment.id = 'comment';
      comment.placeholder = 'Your comment';
      comment.attributes.required = true;
      submit.type = 'submit';
      submit.innerHTML = 'Add Comment';
      commentList.classList.add('comment-list');
      listTitle.innerHTML = 'Comments (0)';
      commentSection.classList.remove('hidden');
      screen.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      // appending elements
      commentSection.innerHTML = '';
      commentSection.appendChild(closeBtn);
      info.appendChild(title);
      info.appendChild(tag);
      info.appendChild(tag02);
      info.appendChild(tag03);
      info.appendChild(tag04);
      commentForm.appendChild(commenter);
      commentForm.appendChild(comment);
      commentForm.appendChild(submit);
      commentList.appendChild(listTitle);
      commentsBox.append(commentsTitle, commentForm, commentList);
      textContent.append(info, commentsBox);
      commentSection.append(img, textContent);

      closeBtn.addEventListener('click', () => {
        commentSection.classList.add('hidden');
        screen.classList.add('hidden');
        document.body.style.overflow = 'auto';
      });

      comments.getComments(id)
        .then((data) => {
          if (data.length > 0) {
            data.forEach((comment) => {
              const newComment = document.createElement('p');
              newComment.innerHTML = `<strong>${comment.creation_date}:</strong> ${comment.username}: "${comment.comment}".`;
              commentList.appendChild(newComment);
            });
            counter(commentList, listTitle, 'Comments');
          } else {
            const newComment = document.createElement('p');
            newComment.innerHTML = '<em>No comments yet. Be the first to comment!</em>';
            commentList.appendChild(newComment);
          }
        });

      submit.addEventListener('click', (e) => {
        e.preventDefault();
        comments.addComment(id, commenter.value, comment.value)
          .then(() => {
            comments.getComments(id)
              .then((data) => {
                commentList.innerHTML = '';
                commentList.appendChild(listTitle);
                data.forEach((comment) => {
                  const newComment = document.createElement('p');
                  newComment.innerHTML = `<strong>${comment.creation_date}:</strong> ${comment.username}: "${comment.comment}".`;
                  commentList.appendChild(newComment);
                });
                counter(commentList, listTitle, 'Comments');
              });
          });
        commenter.value = '';
        comment.value = '';
      });
    });
  });
};

export default activateComments;