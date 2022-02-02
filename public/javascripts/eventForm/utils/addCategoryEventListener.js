function colorizeCategoryBorder(inputElement) {
  const element = inputElement;

  if (element.value === 'none') element.style.border = '2px solid red';
  else element.style.border = '2px solid green';
  element.style.outline = 'none';
}

export default function addCategoryEventListener() {
  const category = document.getElementById('event-category');

  // 카테고리 변경시, 2초동안 테두리색 변경
  category.addEventListener('change', () => {
    colorizeCategoryBorder(category);
    setTimeout(() => {
      category.style.border = 'none';
    }, 2000);
  });

  // 이벤트 생성 버튼 클릭시, 카테고리 테두리색 변경
  category.addEventListener('invalid', () => {
    colorizeCategoryBorder(category);
  });

  // 카테고리에 포커스가 사라지면, 1초동안 테두리색 변경
  category.addEventListener('blur', () => {
    if (category.style.border === '2px solid red')
      setTimeout(() => {
        category.style.border = 'none';
      }, 1000);
  });
}
