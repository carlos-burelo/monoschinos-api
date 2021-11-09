import { parse } from 'node-html-parser';
import axios from 'axios';
import { getAttr, urls } from '../config.js';

export async function searchAnime(req, res) {
  try {
    let { id } = req.params;
    const { data } = await axios.get(`${urls.search}${id}`);
    const html = parse(data);
    res.json(
      html.querySelectorAll('.animes .row article').map((i) => {
        return {
          id: getAttr(i, 'a', 'href').split('/').pop() || null,
          title: i.querySelector('h3.Title').text || null,
          image: getAttr(i, '.cover .img-fluid', 'src') || null,
          type: i.querySelector('.category.text-uppercase').text.trim() || null,
          year: parseInt(i.querySelector('.fecha').text) || null,
        };
      })
    );
  } catch (error) {
    res.status(500).json({
      id: 'intertal-server-error',
      message: error.message,
    });
  }
}
