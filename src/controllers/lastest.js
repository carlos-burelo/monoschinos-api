import axios from 'axios';
import { attr, api } from '../config.js';
import { parse } from 'node-html-parser';

export async function getLastest(req, res) {
  try {
    const { data } = await axios.get(api.home);
    const html = parse(data);
    res.json(
      html
        .querySelectorAll('.row.row-cols-5 .col.col-md-6.col-lg-2.col-6')
        .map((i) => {
          const id = attr(i, 'a', 'href').split('/').pop();
          return {
            id: id || null,
            title: i.querySelector('.animetitles')?.text || null,
            image: attr(i, '.animeimghv') || null,
            type: i.querySelector('.positioning button').text.trim() || null,
            no: parseInt(i.querySelector('.positioning h5').text.trim() || '0') || null,
          };
        })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
