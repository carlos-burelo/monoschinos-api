import { attr, api, get } from '../config.js';
import { parse } from 'node-html-parser';

export async function getAnime(req, res) {
  try {
    const url = 'https://monoschinos2.com/';
    const { id } = req.params;
    const { data } = await get(api.anime(id));
    const html = parse(data);
    const date = html.querySelectorAll('.breadcrumb')[1].querySelector('.breadcrumb-item').text;
    res.status(200).json({
      banner: attr(html, '.herobg img', 'src'),
      image: attr(html, '.chapterpic img', 'src'),
      title:
        html
          .querySelector('.chapterdetails h1')
          .text.replace(/Sub Español/gi, '')
          .trim() || null,
      titleAlt: html.querySelector('.alterno').text || null,
      sinopsis: html.querySelector('.textComplete').text.replace('Ver menos', '') || null,
      status: html.querySelector('#btninfo').text.trim() || null,
      rating: html.querySelector('.chapterpic p').text || null,
      genders: html.querySelectorAll('.breadcrumb .breadcrumb-item a').map((g) => g.text) || null,
      date: date || null,
      episodes:
        html.querySelectorAll('.row.jpage.row-cols-md-6 .col-item a').map((cap) => {
          const epId = cap.attributes['href'].replace(`${url}ver/`, '');
          return {
            image: attr(cap, '.animeimghv', 'data-src'),
            no: parseInt(epId.split('-').pop()),
            id: epId,
          };
        }) || null,
    });
  } catch (error) {
    res.status(500).json({
      id: 'intertal-server-error',
      message: error.message,
    });
  }
}
