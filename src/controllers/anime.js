import axios from 'axios';
import { attr, api } from '../config.js';
import { parse } from 'node-html-parser';

export async function getAnime(req, res) {
  try {
    const url = 'https://monoschinos2.com/';
    const noImage = 'https://monoschinos2.com/assets/img/no_image.png';
    const defaulImage = 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg';
    const { id } = req.params;
    const { data } = await axios.get(api.anime(id));
    const html = parse(data);
    const urlMatch = /url\((.+)\)/gim;
    const image = attr(html, '.heroarea', 'style')
      .match(urlMatch)[0]
      .replace(/url\(|\)/g, '');
    res.status(200).json({
      banner: image == noImage ? defaulImage : image || null,
      image: attr(html, '.chapterpic img', 'src') || null,
      title:
        html
          .querySelector('.chapterdetails h1')
          .text.replace(/Sub Español/gi, '')
          .trim() || null,
      sinopsis: html.querySelector('.chapterdetails p').text || null,
      status: html.querySelector('.butns .btn1').text.trim() || null,
      date: parseInt(html.querySelector('.butns .btn2').text.trim()) || null,
      rating: html.querySelector('.chapterpic p').text || null,
      genders: html.querySelectorAll('.breadcrumb .breadcrumb-item a').map((g) => g.text) || null,
      episodes:
        html.querySelectorAll('.row.jpage.row-cols-md-6 .col-item a').map((cap) => {
          const epId = cap.attributes['href'].replace(`${url}ver/`, '');
          return {
            image: attr(cap, '.animeimghv', 'src'),
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
