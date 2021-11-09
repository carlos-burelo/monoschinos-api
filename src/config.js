const page = 'https://monoschinos2.com';

export const urls = {
  main: page,
  emision: page + '/emision?page=',
  search: page + '/search?q=',
  anime: page + '/anime',
  episode: page + '/ver',
  gender: page + '/genero',
  letter: page + '/letra',
  ova: page + '/categoria/ova',
};

/**
 * @returns {string}
 */
export function getAttr(html, selector, attr) {
  return html.querySelector(selector).attributes[attr];
}
