export default function replaceToHyerlink(text) {
  const regexForFullUrl =
    /(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  const httpsRegex = /https?:\/\//;
  let prefix;

  return text.replace(regexForFullUrl, match => {
    if (httpsRegex.test(match)) prefix = '';
    else if (match === '42seoul.io/cluster') prefix = 'http://';
    else prefix = 'https://';
    return `<a class="details-anchor" href="${prefix + match}">${match}</a>`;
  });
}
