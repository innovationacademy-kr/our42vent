import { colorizeBorderForStr } from './colorizeBorder.js';

function checkCategoryAndColorizeBorder(element) {
  if (element.value === 'none') {
    colorizeBorderForStr(false, element, true);
  } else {
    colorizeBorderForStr(true, element, true);
  }
}

export default function addCategoryEventListener() {
  const category = document.getElementById('event-category');

  // 카테고리 변경시 2초동안 테두리색 변경
  category.addEventListener('change', () => {
    checkCategoryAndColorizeBorder(category);
    setTimeout(() => {
      category.style.border = 'none';
    }, 2000);
  });

  // 이벤트 생성 버튼 클릭시, 카테고리 테두리색 변경
  category.addEventListener('invalid', () => {
    checkCategoryAndColorizeBorder(category);
  });

  // 카테고리에 포커스가 사라지면, 1초동안 테두리색 변경
  category.addEventListener('blur', () => {
    if (category.style.border === '2px solid red')
      setTimeout(() => {
        category.style.border = 'none';
      }, 1000);
  });
}
