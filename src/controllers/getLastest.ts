import cheerio from 'cheerio';
import axios from 'axios';
import { urls } from '../config';
import { Response, Request } from 'express';

export async function getLastest(req: Request, res: Response) {
  try {
    const { data } = await axios.get(urls.main);
    const $ = cheerio.load(data);
    let getLastest = $('.container .caps .container')[0];
    const animes: cheerio.Element[] = $(getLastest)
      .find('.row article')
      .map((i, e) => {
        let el: cheerio.Cheerio = $(e);
        let type: string = el.find('.Image figure span').text();
        return {
          id: el
            .find('a')
            .attr('href')
            .replace(/https:\/\/monoschinos2\.com\/ver\//, ''),
          title: el.find('.Title').html().split('\t')[0],
          cover: el.find('.Image img').attr('src'),
          type: type.substring(1, type.length),
          episode: parseInt(el.find('.dataEpi .episode').text().split('\n')[1]),
        };
      })
      .toArray();
    return res.json(animes).status(200);
  } catch (error) {
    return res.json({ error: error.message }).status(500);
  }
}
