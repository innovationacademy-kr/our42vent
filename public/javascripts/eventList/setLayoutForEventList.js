import addClickListenerForDelete from './addClickListenerForDelete.js';
import addClickListenerForEdit from './addClickListenerForEdit.js';
import clickEventDetails from '../eventDetail/clickEventDetails.js';
import generateEventList from './generateEventList.js';
import addClickListnerForToday from './addClickListnerForToday.js';

function getScrollOffset(eventListSection) {
  const outdatedDivArray = eventListSection.querySelectorAll('.date-outdated');
  console.log(outdatedDivArray);
  console.log(outdatedDivArray[outdatedDivArray.length - 1].getBoundingClientRect());

  return outdatedDivArray.length === 0
    ? 0
    : outdatedDivArray[outdatedDivArray.length - 1].getBoundingClientRect().bottom -
        eventListSection.getBoundingClientRect().top +
        40;
}

// 내가 생성한 이벤트 페이지의 레이아웃 설정
function setLayoutForEventList() {
  const navTag = document.querySelector('nav');
  if (window.innerWidth > 1080) navTag.classList.add('hidden');
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) navTag.classList.add('hidden');
    else navTag.classList.remove('hidden');
  });

  const navbarCategoryDiv = navTag.querySelector('.navbar-category');
  const toggleDivider = navTag.querySelector('.toggle-divider');
  const myEventListDiv = navTag.querySelector('.navbar-tab-my');

  navTag.querySelector('.toggle-all-event').textContent = '달력으로 돌아가기';
  myEventListDiv.parentElement.removeChild(myEventListDiv);
  toggleDivider.style.display = 'none';
  navbarCategoryDiv.style.display = 'none';
  document.querySelector('.layout').style.gridTemplateRows = '70px 1fr 60px';
  document.querySelector('.main').style.height = 'calc(100vh - 70px)';
}

function addListenersForEventList(eventListSection, scrollOffset) {
  addClickListnerForToday(eventListSection, scrollOffset);
  addClickListenerForDelete(eventListSection);
  addClickListenerForEdit(eventListSection);
  clickEventDetails();
}

async function rendEventListPage() {
  try {
    setLayoutForEventList();
    await generateEventList();

    const eventListSection = document.querySelector('.eventlist');
    console.log(eventListSection.getBoundingClientRect());
    const scrollOffset = getScrollOffset(eventListSection);
    console.log(scrollOffset);
    eventListSection.scrollTo({ top: 0 });
    eventListSection.scrollTo({ top: scrollOffset });
    addListenersForEventList(eventListSection, scrollOffset);
  } catch (err) {
    window.location.replace('/');
  }
}

rendEventListPage();
