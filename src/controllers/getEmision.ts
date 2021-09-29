import axios from 'axios';
import cheerio from 'cheerio';
import { Request, Response } from 'express';
import { urls } from '../config';

export async function getEmision(req: Request, res: Response) {
  try {
    let { page = '1' } = req.query;
    const { data } = await axios.get(`${urls.emision}${page}`);
    const $ = cheerio.load(data);
    const animes = $('.animes .container .row article')
      .map((i, e) => {
        let el: cheerio.Cheerio = $(e);
        let category: string = el.find('.category').text();
        return {
          id: el.find('a').attr('href').split('/')[4],
          title: el.find('.Title').text(),
          img: el.find('.Image img').attr('src'),
          category: el.find('.category').text().substring(1, category.length),
          year: parseInt(el.find('.fecha').text()),
        };
      })
      .toArray();
    let pagesBase: string = $('.pagination').text().match(/\d/g).pop();
    let pages = parseInt(pagesBase);
    res.json({ animes, pages }).status(200);
  } catch (err) {
    res.json({
      message: err.message,
      success: false,
    });
  }
}
// 46 lines before refactoring
