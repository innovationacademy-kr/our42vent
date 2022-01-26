import axios from 'axios';

// 공휴일 XML array -> datetime array
function holidaysXmlToDate(xmlArray) {
  return xmlArray
    .map(xml => xml.match(/<locdate>(.*?)<\/locdate>/g))
    .flat(1)
    .filter(value => value)
    .map(
      value =>
        new Date(
          value.slice(9, 13),
          Number(value.slice(13, 15)) - 1,
          Number(value.slice(15, 17)),
          9
        )
    );
}

function getUrlArray(yearArray, monthArray) {
  // 겹치는 연월 제거
  if (monthArray[0] === monthArray[1]) {
    monthArray.shift();
    yearArray.shift();
  } else if (monthArray[1] === monthArray[2]) {
    monthArray.pop();
    yearArray.pop();
  }

  // Promise.all 에서 사용할 각 월별 URL array 생성
  return monthArray.map((value, index) => {
    let monthIndex = encodeURIComponent(value + 1);
    if (monthIndex.length === 1) monthIndex = `0${monthIndex}`;
    return (
      'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo' +
      `?${encodeURIComponent('serviceKey')}=${process.env.OPEN_API_SERVICE_KEY}` +
      `&${encodeURIComponent('solYear')}=${encodeURIComponent(yearArray[index])}` +
      `&${encodeURIComponent('solMonth')}=${monthIndex}`
    );
  });
}

// 국가 공휴일 (string) array 형태로 반환
export default async function getHolidays(dates, year, month) {
  const yearArray = [dates[0].getFullYear(), year, dates.at(-1).getFullYear()];
  const monthArray = [dates[0].getMonth(), month, dates.at(-1).getMonth()];

  const urlArray = getUrlArray(yearArray, monthArray);

  try {
    // axios 로 공휴일 api 데이터 요청
    const holidays = await Promise.all(
      urlArray.map(async url => {
        const { data } = await axios.get(url, { headers: { Accept: 'application/xml' } });
        return data;
      })
    );
    return holidaysXmlToDate(holidays)
      .filter(date => date >= dates[0] && date <= dates.at(-1))
      .map(date => date.toISOString());
  } catch (err) {
    throw new Error(err.message);
  }
}
