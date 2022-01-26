export default function setCategoryName(category) {
  let finalCategory;
  switch (category) {
    case 'lecture':
      finalCategory = '특강';
      break;
    case 'exam':
      finalCategory = '시험';
      break;
    case 'contest':
      finalCategory = '해커톤/공모전';
      break;
    case 'conference':
      finalCategory = '세미나/컨퍼런스';
      break;
    default:
      finalCategory = '커뮤니티';
  }
  return finalCategory;
}
