const url = 'https://monoschinos2.com';

export const api = {
  home: `${url}`,
  all: (id) => `${url}/animes?p=${id}`,
  emision: (id) => `${url}/emision?p=${id}`,
  calendar: `${url}/calendario`,
  search: (id, page) => `${url}/buscar?q=${id.replace(/\s/g, '+')}&p=${page}`,
  anime: (id) => `${url}/anime/${id}`,
  episode: (id) => `${url}/ver/${id}`,
  gender: (id) => `${url}/genero/${id}`,
  filter: ({ categoria, fecha, genero, letra, pagina }) =>
    `${url}/animes?categoria=${categoria}&genero=${genero}&fecha=${fecha}&letra=${letra}&p=${pagina}`,
};
export function attr(html, selector, attribute = 'src') {
  return html.querySelector(selector)?.attributes[attribute];
}
