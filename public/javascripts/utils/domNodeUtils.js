export function createElementAddClass(elemName, classArray, text = null) {
  const newElem = document.createElement(elemName);
  classArray.forEach(className => {
    if (className) newElem.classList.add(className);
  });
  if (text) newElem.textContent = text;
  return newElem;
}

export function removeNodeList(nodeList) {
  nodeList.forEach(date => date.remove());
}
