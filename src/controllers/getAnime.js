import axios from 'axios';
import { getAttr, urls } from '../config.js';
import { parse } from 'node-html-parser';

export async function getAnime(req, res) {
  try {
    const url = 'https://monoschinos2.com/';
    const noImage = 'https://monoschinos2.com/assets/img/no_image.png';
    const defaulImage = 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg';
    const { id } = req.params;
    const { data } = await axios.get(`${urls.anime}/${id}`);
    const html = parse(data);
    const image = getAttr(html, '.Banner img', 'src');
    res.status(200).json({
      banner: image == noImage ? defaulImage : image || null,
      image: getAttr(html, 'figure img.img-fluid', 'src') || null,
      title:
        html
          .querySelector('h1.Title')
          .text.replace(/Sub Español/gi, '')
          .trim() || null,
      sinopsis: html.querySelector('.row .col-sm-9 .Description p').text || null,
      status: html.querySelector('.row .col-sm-9 .Type').text.trim() || null,
      date: html.querySelector('.after-title.mb-2').text.match(/\d+-\d+-\d+/)[0] || null,
      type:
        html.querySelector('.after-title.mb-2').text.match(/(\d+-\d+-\d+)\s?\|\s([A-Za-z]+)/)[2] ||
        null,
      genders: html.querySelectorAll('.generos a').map((g) => g.text) || null,
      episodes:
        html.querySelectorAll('.SerieCaps a').map((cap) => {
          const epId = cap.attributes['href'].replace(`${url}ver/`, '');
          return {
            no: parseInt(epId.split('-').pop()),
            id: epId,
          };
        }) || null,
      sugestions:
        html.querySelectorAll('.recom article').map((i) => {
          return {
            id: getAttr(i, 'a', 'href').replace(`${url}anime/`, ''),
            image: getAttr(i, 'a .Image img', 'src'),
            title: i.querySelector('a .Title').text,
            year: parseInt(i.querySelector('.fecha').text),
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
