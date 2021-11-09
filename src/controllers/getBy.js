import axios from 'axios';
import { parse } from 'node-html-parser';
import { urls, getAttr } from '../config.js';

export async function getBy(req, res) {
  try {
    const { gender, category, letter, year, page = '1', sort, order } = req.query;
    let response;
    if (gender) response = await axios.get(`${urls.main}/genero/${gender}?page=${page}`);
    if (category) response = await axios.get(`${urls.main}/categoria/${category}?page=${page}`);
    if (letter) response = await axios.get(`${urls.main}/letra/${letter}?page=${page}`);
    if (year) response = await axios.get(`${urls.main}/year/${year}?page=${page}`);
    const { data } = response;
    const html = parse(data);
    const animes = html.querySelectorAll('.animes .container .row article').map((i) => {
      const id = getAttr(i, 'a', 'href');
      return {
        id: id.split('/').pop() || null,
        title: i.querySelector('.Title').text.trim() || null,
        image: getAttr(i, '.Image img', 'src') || null,
        type: i.querySelector('.category.text-uppercase').text.trim() || null,
        year: parseInt(i.querySelector('.fecha').text) || null,
      };
    });
    const isAsc = order == 'asc';
    const ordered = animes.sort((a, b) => {
      return (a[sort] < b[sort] ? -1 : 1) * (isAsc ? 1 : -1);
    });
    res.status(200).json(sort ? ordered : animes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
