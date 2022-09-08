import './styles.css';
import display from './modules/displayItems.js';
import activateComments from './modules/comments.js';
import likes from './modules/countLikes.js';

display()
  .then(() => {
    activateComments();
    likes.displayLikes();
    likes.activateLikeBtns();
  });