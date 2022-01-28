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
