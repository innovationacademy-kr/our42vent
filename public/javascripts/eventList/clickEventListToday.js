import hoverTodayIcon from '../calendar/month/clickToday.js';

export default function clickEventListToday(eventListSection, scrollOffset) {
  const todayButton = document.querySelector('.header-today-button');
  todayButton.addEventListener('click', () =>
    eventListSection.scrollTo({ top: scrollOffset, behavior: 'smooth' })
  );
  hoverTodayIcon();
}
