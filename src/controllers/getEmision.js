import axios from 'axios';
import { parse } from 'node-html-parser';
import { getAttr, urls } from '../config.js';

export async function getEmision(req, res) {
  try {
    let { page = '1' } = req.query;
    const { data } = await axios.get(`${urls.emision}${page}`);
    const html = parse(data);
    res.status(200).json(
      html.querySelectorAll('.animes .container .row article').map((i) => {
        return {
          id: getAttr(i, 'a', 'href').split('/').pop(),
          title: i.querySelector('.Title').text.trim(),
          image: getAttr(i, '.Image img', 'src'),
          type: i.querySelector('.category').text.trim(),
          year: parseInt(i.querySelector('.fecha').text),
        };
      })
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
