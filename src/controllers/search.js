import axios from 'axios';
import { parse } from 'node-html-parser';
import { api, attr } from '../config.js';

export async function searchAnime(req, res) {
  try {
    let { id } = req.params;
    let { page = '1' } = req.query;
    const { data } = await axios.get(api.search(id, page));
    const html = parse(data);
    res.json(
      html.querySelectorAll('.heromain .row .col-md-4.col-lg-2.col-6').map((i) => {
        return {
          id: attr(i, 'a', 'href').split('/').pop() || null,
          title: i.querySelector('.seristitles ').text || null,
          image: attr(i, '.seriesimg .animemainimg', 'src') || null,
        };
      })
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
