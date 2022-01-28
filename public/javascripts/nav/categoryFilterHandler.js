import drawMonth from '../calendar/month/drawMonth.js';

const categories = ['특강', '시험', '해커톤 / 공모전', '세미나 / 컨퍼런스', '커뮤니티'];
const checkboxArray = document.querySelectorAll('input[type=checkbox]');

checkboxArray.forEach((item, index) => {
  const checkbox = item;
  const { name } = checkbox;
  const selectedBox = checkbox.parentElement.querySelector(`.${name}.category-item`);

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      const curCategories = sessionStorage.getItem('categories');
      sessionStorage.setItem('categories', `${curCategories}-${name}`);
      selectedBox.innerHTML = `<i class="material-icons-outlined">done</i><div class="text-left">${categories[index]}</div>`;
    } else {
      const curCategories = sessionStorage.getItem('categories');
      sessionStorage.setItem('categories', curCategories.replace(`-${name}`, ''));
      selectedBox.innerHTML = `<i></i><div class="text-left">${categories[index]}</div>`;
    }
    drawMonth();
  });
});
