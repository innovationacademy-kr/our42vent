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
