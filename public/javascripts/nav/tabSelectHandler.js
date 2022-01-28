import { generateMonth, renderInfo } from '../calendar/month/generateMonth.js';

const allEventsTab = document.querySelector('.navbar-tab-all');
const myEventsTab = document.querySelector('.navbar-tab-my');

function drawTabSelection(activeInactive) {
  activeInactive[0].classList.replace('navbar-tab-inactive', 'navbar-tab-active');
  activeInactive[1].classList.replace('navbar-tab-active', 'navbar-tab-inactive');
  activeInactive[0]
    .querySelector('svg')
    .classList.replace('navbar-tab-inactive', 'navbar-tab-active');
  activeInactive[1]
    .querySelector('svg')
    .classList.replace('navbar-tab-active', 'navbar-tab-inactive');
}

allEventsTab.addEventListener('click', () => {
  if (sessionStorage.getItem('isMyEvent')) {
    sessionStorage.removeItem('isMyEvent');
    drawTabSelection([allEventsTab, myEventsTab]);
    renderInfo[0] = generateMonth();
  }
});

myEventsTab.addEventListener('click', () => {
  if (!sessionStorage.getItem('isMyEvent')) {
    sessionStorage.setItem('isMyEvent', '1');
    drawTabSelection([myEventsTab, allEventsTab]);
    renderInfo[0] = generateMonth();
  }
});

const initialTab = sessionStorage.getItem('isMyEvent')
  ? [myEventsTab, allEventsTab]
  : [allEventsTab, myEventsTab];

drawTabSelection(initialTab);
