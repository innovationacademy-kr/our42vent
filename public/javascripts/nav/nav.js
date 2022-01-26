const categories = ['특강', '시험', '해커톤 / 공모전', '세미나 / 컨퍼런스', '커뮤니티'];
const checkboxArray = document.querySelectorAll('input[type=checkbox]');

checkboxArray.forEach((item, index) => {
  const checkbox = item;

  checkbox.addEventListener('change', () => {
    const selectedBox = document.querySelector(`.${checkbox.id.substring(9)}.category-item`);
    if (checkbox.checked) {
      selectedBox.innerHTML = `<i class="material-icons-outlined">done</i><div>${categories[index]}</div>`;
    } else {
      selectedBox.innerHTML = `<i></i><div>${categories[index]}</div>`;
    }
  });
});

const navScrollIcon = document.querySelector('.material-icons-outlined.category-scroll');
const navCategoryDiv = document.querySelector('.navbar-category');

navScrollIcon.addEventListener('click', () => {
  console.log(navCategoryDiv.scrollLeft);
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
