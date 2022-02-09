export default function replaceToHyerlink(text) {
  const regexForFullUrl =
    /(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  const httpRegex = /https?:\/\//;

  const replacedText = text.replace(regexForFullUrl, match => {
    const urlPrefix = httpRegex.test(match) ? '' : 'https://';
    return `<a class="details-anchor" href="${urlPrefix + match}">${match}</a>`;
  });
  return replacedText;
}
