export default function createElementAddClass(elemName, classArray) {
  const newElem = document.createElement(elemName);
  classArray.map(className => newElem.classList.add(className));
  return newElem;
}
