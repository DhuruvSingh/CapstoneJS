import './styles.css';
import display from './modules/displayItems.js';
import activateComments from './modules/comments.js';

display()
  .then(() => {
    activateComments();
  });
