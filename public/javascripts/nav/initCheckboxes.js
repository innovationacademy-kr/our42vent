// 체크된 카테고리 확인
function setSelectedCategories() {
  const checkboxArray = document.querySelectorAll('input[type=checkbox]');
  let checkedCategoriesArray = [];

  if (!sessionStorage.getItem('categories')) {
    checkboxArray.forEach(checkbox => {
      const category = checkbox;
      checkedCategoriesArray.push(category.name);
      category.checked = true;
    });
    sessionStorage.setItem('categories', `-${checkedCategoriesArray.join('-')}`);
  } else {
    checkedCategoriesArray = sessionStorage.getItem('categories').split('-');
    checkboxArray.forEach(checkbox => {
      const category = checkbox;
      if (checkedCategoriesArray.includes(category.name)) category.checked = true;
    });
  }
}

function initCheckboxes() {
  const categories = ['특강', '시험', '해커톤 / 공모전', '세미나 / 컨퍼런스', '커뮤니티'];
  const checkboxArray = document.querySelectorAll('input[type=checkbox]');

  checkboxArray.forEach((item, index) => {
    const checkbox = item;
    const { checked, name } = checkbox;
    const selectedBox = checkbox.parentElement.querySelector(`.${name}.category-item`);
    if (!checked)
      selectedBox.innerHTML = `<i></i><div class="text-left">${categories[index]}</div>`;
  });
}

setSelectedCategories();
initCheckboxes();
