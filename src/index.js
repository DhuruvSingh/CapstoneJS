import './styles.css';
import display from './modules/displayItems.js';
import activateComments from './modules/comments.js';
import activateReservations from './modules/reservations.js';

display()
  .then(() => {
    activateComments();
    activateReservations();
  });
