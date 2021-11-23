import axios from 'axios';
import { getAttr, urls } from '../config.js';
import { parse } from 'node-html-parser';

export async function getLastest(req, res) {
  try {
    const { data } = await axios.get(urls.main);
    const html = parse(data);
    res.json(
      html.querySelectorAll('.row.row-cols-5 .col.col-md-6.col-lg-2.col-6').map((i) => {
        const id = getAttr(i, 'a', 'href').split('/').pop();
        return {
          id: id || null,
          title: i.querySelector('.animetitles').text || null,
          image: getAttr(i, '.animeimghv', 'src') || null,
          type: i.querySelector('.positioning button').text.trim() || null,
          episode: parseInt(i.querySelector('.positioning h5').text.trim()) || null,
        };
      })
    );
  } catch (error) {
    return res.json({ error: error.message }).status(500);
  }
}
