import { attr, api, get } from '../config.js';
import { parse } from 'node-html-parser';

export async function getEmision(req, res) {
  try {
    let { page = '1' } = req.query;
    const { data } = await get(api.emision(page));
    const html = parse(data);
    res.status(200).json(
      html.querySelectorAll('.heromain .row .col-md-4.col-lg-2.col-6').map((i) => {
        return {
          id: attr(i, 'a', 'href').split('/').pop() || null,
          title: i.querySelector('.seristitles').text.trim() || null,
          image: attr(i, '.animemainimg') || null,
        };
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
