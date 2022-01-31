import { colorizeBorderForStr } from './colorizeBorder.js';

function checkCategoryAndcolorizeBorder(element) {
  if (element.value === 'none') {
    colorizeBorderForStr(false, element, true);
  } else {
    colorizeBorderForStr(true, element, true);
  }
}

export default function addCategoryEventListener() {
  const category = document.getElementById('event-category');

  category.addEventListener('change', () => {
    checkCategoryAndcolorizeBorder(category);
    setTimeout(() => {
      category.style.border = 'none';
    }, 2000);
  });

  category.addEventListener('invalid', () => {
    checkCategoryAndcolorizeBorder(category);
  });

  category.addEventListener('blur', () => {
    if (category.style.border === '2px solid red')
      setTimeout(() => {
        category.style.border = 'none';
      }, 1000);
  });
}
