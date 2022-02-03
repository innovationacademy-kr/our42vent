import drawMonth from '../calendar/month/drawMonth.js';

const checkboxArray = document.querySelectorAll('input[type=checkbox]');

// 카테고리 checkbox 표시 & 반영 이벤트 핸들러
checkboxArray.forEach((item, index) => {
  const checkbox = item;
  const { name } = checkbox;
  const doneIcon = checkbox.parentElement.querySelector(`.${name}.box-wrapper > i`);

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      const curCategories = sessionStorage.getItem('categories');
      sessionStorage.setItem('categories', `${curCategories}-${name}`);
      doneIcon.textContent = 'done';
    } else {
      const curCategories = sessionStorage.getItem('categories');
      sessionStorage.setItem('categories', curCategories.replace(`-${name}`, ''));
      doneIcon.textContent = '';
    }
    drawMonth();
  });
});

// 카테고리 overflow hide 되는 시점에서 좌우 이동 버튼 이벤트 리스너
const navScrollIcon = document.querySelector('.material-icons-outlined.category-scroll');
const navCategoryDiv = document.querySelector('.navbar-category');

navScrollIcon.addEventListener('click', () => {
  if (navScrollIcon.classList.toggle('flip-icon'))
    navCategoryDiv.scrollTo({
      left: navCategoryDiv.getBoundingClientRect().right,
      behavior: 'smooth',
    });
  else {
    navCategoryDiv.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }
});
