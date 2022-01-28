// 선택된 카테고리들에 해당하는 이벤트들만 추출해서 filter 된 dateEventArray 리턴
export default function filterByCategories(dateEventArrayStr, categoriesArray) {
  const filteredArray = JSON.parse(dateEventArrayStr);

  filteredArray.forEach(date => {
    const curDate = date;
    curDate.eventArray = curDate.eventArray.filter(event =>
      categoriesArray.includes(event.category)
    );
  });
  return filteredArray;
}
