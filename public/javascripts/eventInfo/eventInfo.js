function displayEventInfo() {
  document.querySelector('.layout-form').style.display = 'grid';
  document.querySelector('.form-button-new').style.display = 'block';
  document.querySelector('.form-button-edit').style.display = 'none';

  try {
    const { title, personInCharge, beginAt, endAt, location, category, topic, details } =
      await getEventDetails(eventId);

    document.querySelector('.details-category').textContent = setCategoryName(category);
    document.querySelector('.details-title').textContent = title;
    document.querySelector('.details-beginat').textContent = setBeginAt(beginAt);

    document.querySelector(
      '.details-duration'
    ).innerHTML = `<i class="material-icons"> schedule</i>&nbsp;&nbsp;${setDuration(
      beginAt,
      endAt
    )}`;

    document.querySelector(
      '.details-location'
    ).innerHTML = `<i class="material-icons">room</i>&nbsp;${location}`;

    // personInCharge 내용이 있냐 없냐에 따라 div 추가 / 제거
    const picElement = document.querySelector('.details-pic');

    if (personInCharge !== '' && personInCharge !== null) {
      picElement.innerHTML =
        `<span class="details-pic-label text-bold">` +
        `발표자 / 담당자&nbsp;&nbsp;:</span>&nbsp;&nbsp;${personInCharge}`;
      picElement.style.display = 'flex';
    } else {
      picElement.innerHTML = '';
      picElement.style.display = 'none';
    }

    document.querySelector('.details-topic').innerHTML =
      '<div class="details-topic-label text-bold">주제</div>' +
      `<div class="details-topic-content">${topic}</div>`;

    // details 내용이 있냐 없냐에 따라 div 추가 / 제거
    const detailsElement = document.querySelector('.details-details');
    if (details !== '' && details !== null) {
      detailsElement.innerHTML =
        '<div class="details-details-label text-bold">상세정보</div>' +
        `<div class="details-details-content">${details}</div>`;
      detailsElement.style.display = 'flex';
    } else {
      detailsElement.innerHTML = '';
      detailsElement.style.display = 'none';
    }

    // 알림 설정시, 다음 이벤트 상세보기에서 default로 원상복귀
    document.getElementById('details-notification').value = 'none';
  } catch (err) {
    // TODO 에러페이지 표시
    console.log(err.message);
  }
}
