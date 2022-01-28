/**
 * 새로고침 및 페이지 전환 시 sessionStorage 에서 이전에 check 돼있던 카테고리들 확인
 * 이전에 check 돼있던 카테고리 checkbox 들 checked 로 전환 및 표시
 */
function initCheckboxes() {
  const checkboxArray = document.querySelectorAll('input[type=checkbox]');
  const categories = ['특강', '시험', '해커톤 / 공모전', '세미나 / 컨퍼런스', '커뮤니티'];
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

  checkboxArray.forEach((item, index) => {
    const checkbox = item;
    const { checked, name } = checkbox;
    const selectedBox = checkbox.parentElement.querySelector(`.${name}.box-wrapper`);
    if (!checked)
      selectedBox.innerHTML = `<i></i><div class="text-left">${categories[index]}</div>`;
  });
}

initCheckboxes();
