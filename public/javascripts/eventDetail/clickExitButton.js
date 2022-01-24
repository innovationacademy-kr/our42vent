// 이벤트 상세보기에서 취소버튼 눌렀을 때!
const clickExitBtnInDetails = document.querySelector('.details-exit-button');

clickExitBtnInDetails.addEventListener('click', () => {
  document.querySelector('.layout-details').style.display = 'none';
});
