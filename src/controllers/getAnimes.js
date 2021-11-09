import { parse } from 'node-html-parser';
import axios from 'axios';
import { getAttr, urls } from '../config.js';

export async function getAnimes(req, res) {
  try {
    let { page = '1' } = req.params;
    const { data } = await axios.get(`${urls.main}/animes?page=${page}`);
    const html = parse(data);
    res.json(
      html.querySelectorAll('.animes .container .row article').map((i) => {
        const id = getAttr(i, 'a', 'href');
        return {
          id: id.split('/').pop() || null,
          title: i.querySelector('.Title').text || null,
          image: getAttr(i, '.Image img', 'src') || null,
          type: i.querySelector('.category.text-uppercase').text || null,
          year: parseInt(i.querySelector('.fecha').text) || null,
        };
      })
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
