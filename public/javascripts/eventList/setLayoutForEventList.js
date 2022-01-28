import addClickListenerForDelete from './addClickListenerForDelete.js';
import addClickListenerForEdit from './addClickListenerForEdit.js';
import generateEventList from './generateEventList.js';

// 스크롤을 오늘 이후 이벤트에 고정
function fixScrollToNextEvent() {
  const eventListSection = document.querySelector('.eventlist');
  const outdatedDiv = document.querySelectorAll('.date-outdated');

  if (outdatedDiv.length === 0) return;

  const lastOutdatedDivPosition =
    outdatedDiv[outdatedDiv.length - 1].getBoundingClientRect().bottom -
    eventListSection.getBoundingClientRect().top +
    40;
  eventListSection.scrollTo(0, lastOutdatedDivPosition);
}

// 화면 크기가 1080px 이상이면 네비바 삭제
function addResizeEventListnerForNav() {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) {
      document.querySelector('nav').classList.add('hidden');
    } else {
      document.querySelector('nav').classList.remove('hidden');
    }
  });
}

// 내가 생성한 이벤트 페이지의 레이아웃 설정
function setLayoutForEventList() {
  if (window.innerWidth > 1080) document.querySelector('nav').classList.add('hidden');
  const navbarCategoryDiv = document.querySelector('.navbar-category');
  const toggleDivider = document.querySelector('.toggle-divider');
  const myEventListDiv = document.querySelector('.navbar-tab-my');
  document.querySelector('.toggle-all-event').textContent = '달력으로 돌아가기';
  myEventListDiv.parentElement.removeChild(myEventListDiv);

  toggleDivider.style.display = 'none';
  navbarCategoryDiv.style.display = 'none';
  document.querySelector('.layout').style.gridTemplateRows = '70px 1fr 60px';
  document.querySelector('.main').style.height = 'calc(100vh - 70px)';

  addResizeEventListnerForNav();
}

setLayoutForEventList();
// TODO : 적절하게 에러 핸들링을 해줘야함
generateEventList()
  .then(() => {
    fixScrollToNextEvent();
    addClickListenerForDelete();
    addClickListenerForEdit();
  })
  .catch(err => {
    //   NOTE : 개발 단계에선 console.error가 필요
    console.error(err.stack);
    window.location.replace('/');
  });
