import cheerio from 'cheerio';
import axios from 'axios';
import { urls } from '../config.js';

export async function getBy(req, res, multiple) {
  try {
    let { gender, letter, category } = req.params;

    let { page } = req.query;

    if (!page) {
      page = '1';
    }

    let bodyResponse;

    if (multiple) {
      bodyResponse = await axios.get(
        `${urls.main}/categoria/${category}/genero/${gender}?page=${page}`
      );
    } else if (gender && !multiple) {
      bodyResponse = await axios.get(`${urls.main}/genero/${gender}?page=${page}`);
    } else if (letter && !multiple) {
      bodyResponse = await axios.get(`${urls.main}/letra/${letter}?page=${page}`);
    } else if (category && !multiple) {
      bodyResponse = await axios.get(`${urls.main}/categoria/${category}?page=${page}`);
    }
    const $ = cheerio.load(bodyResponse.data);

    const animes = [];

    $('.animes .container .row article').each((i, e) => {
      let el = $(e);
      let id = el.find('.link-anime').attr('href');
      id = id.split('/')[4];
      let img = el.find('.link-anime .Image img').attr('src');
      let title = el.find('.link-anime .Title').text();
      let type = el.find('.link-anime .info .category').text();
      let year = el.find('.link-anime .info .fecha').text();

      let anime = {
        id,
        img,
        title,
        type,
        year,
      };

      animes.push(anime);
    });

    let totalPages = $('.pagination').children().length;
    totalPages = $('.pagination').find('.page-item')[totalPages - 2];
    let pages = parseInt($(totalPages).text());

    res.status(200).json({
      animes,
      pages,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}
