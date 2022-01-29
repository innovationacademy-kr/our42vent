import { generateMonth, renderInfo } from '../calendar/month/generateMonth.js';

const allEventsTab = document.querySelector('.navbar-tab-all');
const myEventsTab = document.querySelector('.navbar-tab-my');

// tab 클릭 시 혹은 sessionStorage 에 저장된 이전 tab 정보에 따라 탭 활성화 표시
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

// 모든 이벤트 탭 클릭 핸들러
allEventsTab.addEventListener('click', () => {
  if (sessionStorage.getItem('isMyEvent')) {
    sessionStorage.removeItem('isMyEvent');
    drawTabSelection([allEventsTab, myEventsTab]);
    renderInfo[0] = generateMonth();
  }
});

// 내가 등록한 이벤트 탭 클릭 핸들러
myEventsTab.addEventListener('click', () => {
  if (!sessionStorage.getItem('isMyEvent')) {
    sessionStorage.setItem('isMyEvent', '1');
    drawTabSelection([myEventsTab, allEventsTab]);
    renderInfo[0] = generateMonth();
  }
});

// 새로고침 / 내가 생성한 이벤트에서 달력으로 돌아올 때 이전에 보던 탭 정보 반영해서 표시
const initialTab = sessionStorage.getItem('isMyEvent')
  ? [myEventsTab, allEventsTab]
  : [allEventsTab, myEventsTab];

drawTabSelection(initialTab);
