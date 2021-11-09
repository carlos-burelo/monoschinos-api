import axios from 'axios';
import { getAttr, urls } from '../config.js';
import { parse } from 'node-html-parser';

export async function getLastest(req, res) {
  try {
    const { data } = await axios.get(urls.main);
    const html = parse(data);
    res.json(
      html.querySelectorAll('.row article').map((i) => {
        const id = getAttr(i, 'a', 'href').split('/').pop();
        return {
          id: id || null,
          title: i.querySelector('.Title').text || null,
          image: getAttr(i, '.Image img', 'src') || null,
          type: i.querySelector('.Image figure span').text.trim() || null,
          episode: parseInt(id.split('-').pop()) || null,
        };
      })
    );
  } catch (error) {
    return res.json({ error: error.message }).status(500);
  }
}
