import { generateMonth, renderInfo } from '../calendar/month/generateMonth.js';

const allEventsTab = document.querySelector('.navbar-tab-all');

function tabListener() {
  let activeInactive = [];
  if (sessionStorage.getItem('isMyEvent')) {
    sessionStorage.removeItem('isMyEvent');
    activeInactive = [allEventsTab, myEventsTab];
  } else {
    sessionStorage.setItem('isMyEvent', '1');
    activeInactive = [myEventsTab, allEventsTab];
  }
  activeInactive[0].classList.replace('navbar-tab-inactive', 'navbar-tab-active');
  activeInactive[1].classList.replace('navbar-tab-active', 'navbar-tab-inactive');
  activeInactive[0].firstElementChild.classList.replace('navbar-tab-inactive', 'navbar-tab-active');
  activeInactive[1].firstElementChild.classList.replace('navbar-tab-active', 'navbar-tab-inactive');
  renderInfo[0] = generateMonth();
}

allEventsTab.addEventListener('click', tabListener);

const myEventsTab = document.querySelector('.navbar-tab-my');

myEventsTab.addEventListener('click', tabListener);
