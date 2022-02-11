import clickDelete from './clickDelete.js';
import clickEdit from './clickEdit.js';
import clickEventListToday from './clickEventListToday.js';
import { clickEventDetails } from '../eventDetail/clickEventDetails.js';
import generateEventList from './generateEventList.js';

function getScrollOffset(eventListSection) {
  const outdatedDivArray = eventListSection.querySelectorAll('.date-outdated');

  return !outdatedDivArray.length
    ? 0
    : outdatedDivArray[outdatedDivArray.length - 1].getBoundingClientRect().bottom -
        eventListSection.getBoundingClientRect().top +
        40;
}

// 내가 생성한 이벤트 페이지의 레이아웃 설정
function setLayoutForEventList() {
  const navTag = document.querySelector('nav');
  if (window.innerWidth > 1080) {
    document.querySelector('.layout').style.gridTemplateRows = '70px 1fr 80px';
    navTag.classList.add('hidden');
  } else document.querySelector('.layout').style.gridTemplateRows = '70px 1fr 60px';

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) {
      document.querySelector('.layout').style.gridTemplateRows = '70px 1fr 80px';
      navTag.classList.add('hidden');
    } else document.querySelector('.layout').style.gridTemplateRows = '70px 1fr 60px';
  });

  const navbarCategoryDiv = navTag.querySelector('.navbar-category');
  const toggleDivider = navTag.querySelector('.toggle-divider');
  const myEventListDiv = navTag.querySelector('.navbar-tab-my');

  navTag.querySelector('.toggle-all-event').textContent = '달력으로 돌아가기';
  myEventListDiv.parentElement.removeChild(myEventListDiv);
  toggleDivider.style.display = 'none';
  navbarCategoryDiv.style.display = 'none';
  document.querySelector('.main').style.height = 'calc(100vh - 70px)';
}

function addListenersForEventList(eventListSection, scrollOffset) {
  clickEventListToday(eventListSection, scrollOffset);
  clickDelete(eventListSection);
  clickEdit(eventListSection);
  clickEventDetails();
}

async function renderEventListPage() {
  setLayoutForEventList();
  await generateEventList();

  const eventListSection = document.querySelector('.eventlist');
  eventListSection.scrollTo({ top: 0 });
  const scrollOffset = getScrollOffset(eventListSection);
  eventListSection.scrollTo({ top: scrollOffset });
  addListenersForEventList(eventListSection, scrollOffset);
}

renderEventListPage();
