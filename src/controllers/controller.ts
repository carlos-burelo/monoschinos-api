import cheerio from 'cheerio';
import axios from 'axios';
import { urls } from '../config';
import { SuggestionI, GenderI, AnimeSearchI, EpI } from '../models/interfaces';
import { Request, Response } from 'express';

export async function getAnime(req: Request, res: Response) {
  let noImage: string = 'https://monoschinos2.com/assets/img/no_image.png';
  let defaulImage: string =
    'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg';
  try {
    let { id } = req.params;
    const response = await axios.get(`${urls.anime}/${id}`);
    const $ = cheerio.load(response.data);
    let i = $('.TPost.Serie.Single');
    let banner: string = i.find('.Banner img').attr('src');
    if (banner == noImage) {
      banner = defaulImage;
    } else {
      banner = banner;
    }
    let title = i
      .find('h1.Title')
      .text()
      .replace(/Sub Español/gi, '')
      .trim();
    let sinopsis = i.find('.row .col-sm-9 .Description p').text();
    let status = i.find('.row .col-sm-9 .Type').text().trim();
    let date = i
      .find('.row .col-sm-9 .after-title:nth-child(n)')
      .text()
      .match(/\d{4}-\d{2}-\d{2}/)[0];
    let type = i
      .find('.row .col-sm-9 .after-title:nth-child(n)')
      .text()
      .match(/\|\s\w+/gi)[0]
      .replace(/\|?\s?/, '');
    let cover = i.find('.Image img').attr('src');
    let genders: GenderI[] = [];
    i.find('.generos a').each((i, e) => {
      let el = $(e);
      let title = el.text();
      let id = el.attr('href').split('/')[4];
      genders.push({ title, id });
    });
    let episodes: EpI[] = [];
    i.find('.container .SerieCaps .item').each((i, e) => {
      let el = $(e);
      let episodeId = el.attr('href');
      episodeId = episodeId.split('/')[4];
      episodes.push({
        number: parseInt(episodeId.split('-').pop()),
        id: episodeId,
      });
    });
    if (!episodes || episodes.length == 0) {
      episodes = [];
    }
    let sugestions: SuggestionI[] = [];
    i.find('.container .row .col-12 .recom article').each((i, e) => {
      let el = $(e);
      let id = el.find('a').attr('href');
      id = id.split('/')[4];
      let title = el
        .find('a .Title')
        .text()
        .replace(/ Sub Español/gi, '');
      let cover = el.find('a .Image img').attr('src');
      let year = parseInt(el.find('.fecha').text());
      sugestions.push({
        id,
        title,
        cover,
        year,
      });
    });
    res.json({
      title,
      banner,
      cover,
      sinopsis,
      status,
      date,
      type,
      genders,
      episodes,
      sugestions,
    });
  } catch (err) {
    res.json({
      message: err.message,
      success: false,
    });
  }
}
export async function getAnimes(req: Request, res: Response) {
  try {
    let { page } = req.params;
    !page ? (page = '1') : (page = page);
    const bodyResponse = await axios.get(`${urls.main}/animes?page=${page}`);
    const $ = cheerio.load(bodyResponse.data);
    const animes = [];
    $('.animes .container .row article').each((i, e) => {
      let el = $(e);

      let id = el.find('a').attr('href');
      id = id.split('/')[4];
      let title = el.find('.Title').text();
      let img = el.find('.Image img').attr('src');
      let category = el.find('.category').text();
      category = category.substring(1, category.length);
      let year = parseInt(el.find('.fecha').text());

      const anime = {
        id,
        title,
        img,
        category,
        year,
      };

      animes.push(anime);
    });

    let totalPages: any = $('.pagination').children().length;
    totalPages = $('.pagination').find('.page-item')[totalPages - 2];
    let pages = parseInt($(totalPages).text());
    let current = parseInt(page);
    res.status(200).json({
      current,
      pages,
      animes,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}
export async function searchAnime(req: Request, res: Response) {
  try {
    let { id } = req.params;
    const response = await axios.get(`${urls.search}${id}`);
    const $ = cheerio.load(response.data);
    let animes = [];
    $('.animes .row article').each((i, e) => {
      let el = $(e);
      let title = el.find('h3.Title').text();
      let cover = el.find('div.Image .cover .img-fluid').attr('src');
      let id1 = el.find('a.link-anime').attr('href');
      let id = id1.split('/')[4];
      let category = el.find('.category').text();
      category = category.substring(1, category.length);
      let year = parseInt(el.find('.fecha').text());

      let anime: AnimeSearchI = {
        id,
        title,
        cover,
        category,
        year,
      };
      animes.push(anime);
    });

    res.json(animes);
  } catch (err) {
    res.json({
      message: err.message,
      success: false,
    });
  }
}
export async function getEpisode(req: Request, res: Response) {
  try {
    let { id } = req.params;
    const response = await axios.get(`${urls.episode}/${id}`);
    const $ = cheerio.load(response.data);
    let epnum = $('.Episode .Title-epi').text();
    let title = $('.Episode .Title-epi').text().replace('Sub Español', '').trim();
    let number: any = epnum.split(' ');
    number = parseInt(number[number.length - 3]);
    let ctrls = {
      prev: false,
      next: false,
    };
    $('.d-flex.justify-content-center.mb-4').map((i, e) => {
      let el = $(e);
      if (el.text().includes('Anterior')) {
        ctrls.prev = true;
      }
      if (el.text().includes('Siguiente')) {
        ctrls.next = true;
      }
    });
    let animeId = $('a.btnWeb.green.Current')
      .attr('href')
      .replace('https://monoschinos2.com/anime/', '');
    let videos = [];
    let videosContainer = $('.Episode .content .row .TPlayer').text();
    $(videosContainer).each((i, e) => {
      let el = $(e);
      let url = el.attr('src');
      if (url) {
        url = url.split('url=')[1];
        url = decodeURIComponent(url);
        url = url.split('&id')[0];
        let videolinks = new URL(url);
        let { host } = videolinks;
        let name = host.replace(/\.com|www\.|\.ru|repro\.|\.co|\.nz/, '');
        name = `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
        let servers = {
          url,
          name,
        };
        videos.push(servers);
      }
    });
    let downloads = [];
    let downloadsContainer = $('#downloads table tbody tr');

    $(downloadsContainer).each((i, e) => {
      let el = $(e);

      let link = el.find('a').attr('href');
      let sn = link.replace(/\.com|www\.|\.ru|repro\.|\.co|\.nz/, '');
      let servername = sn.slice(8);
      let svn = servername.indexOf('/');
      let server = servername.slice(0, svn);
      server = `${server.slice(0, 1).toUpperCase()}${server.slice(1)}`;
      let down = {
        server,
        link,
      };
      if (down) {
        downloads.push(down);
      }
    });

    res.json({
      title,
      animeId,
      ctrls,
      number,
      videos,
      downloads,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}
export async function getCategories(req: Request, res: Response) {
  try {
    const response = await axios.get(`${urls.main}/animes`);
    const $ = cheerio.load(response.data);
    let categories = [];
    let categoriesContainer = $('.filter-container .clearfix .float-left')[0];
    $(categoriesContainer)
      .find('.dropdown-menu .dropdown-item')
      .each((i, e) => {
        let el = $(e);
        let title = el.text();
        let id = el.attr('href');
        id = id.split('/')[2];
        let category = {
          title,
          id,
        };
        categories.push(category);
      });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}
export async function getGenders(req: Request, res: Response) {
  try {
    const response = await axios.get(`${urls.main}/animes`);
    const $ = cheerio.load(response.data);

    let genders = [];

    let gendersContainer = $('.filter-container .clearfix .float-left')[1];

    $(gendersContainer)
      .find('.dropdown-menu .dropdown-item')
      .each((i, e) => {
        let el = $(e);

        let title = el.text();
        if (title.charAt(0) == ' ') {
          title = title.substring(1, title.length);
        }
        let id = el.attr('href');
        id = id.split('/')[2];
        let gender: GenderI = {
          title,
          id,
        };
        genders.push(gender);
      });
    res.json(genders);
  } catch (err) {
    res.status(500).json({
      message: err,
      success: false,
    });
  }
}
export async function getGender(req: any, res: any) {
  try {
    let { gender } = req.params;
    let { page } = req.params;
    !page ? (page = 1) : (page = page);
    const bodyResponse = await axios.get(`${urls.main}/genero/${gender}?page=${page}`);
    const $ = cheerio.load(bodyResponse.data);
    const animes = [];

    $('.animes .container .row article').each((i, e) => {
      let el = $(e);

      let id = el.find('a').attr('href');
      id = id.split('/')[4];
      let title = el.find('.Title').text();
      let img = el.find('.Image img').attr('src');
      let category = el.find('.category').text();
      category = category.substring(1, category.length);
      let year = parseInt(el.find('.fecha').text());

      const anime = {
        id,
        title,
        img,
        category,
        year,
      };

      animes.push(anime);
    });

    let totalPages: any = $('.pagination').children().length;
    totalPages = $('.pagination').find('.page-item')[totalPages - 2];
    let pages = parseInt($(totalPages).text());

    let current = parseInt(page);
    res.status(200).json({
      current,
      pages,
      animes,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}
export async function getYears(req: Request, res: Response) {
  try {
    const response = await axios.get(`${urls.main}/animes`);
    const $ = cheerio.load(response.data);

    let years = [];

    let YearsContainer = $('.filter-container .clearfix .float-left')[2];

    $(YearsContainer)
      .find('.dropdown-menu .dropdown-item')
      .each((i, e) => {
        let el = $(e);

        let title = el.text();
        if (title.charAt(0) == ' ') {
          title = title.substring(1, title.length);
        }
        let id = el.attr('href');
        id = id.split('/')[2];
        let year: GenderI = {
          title,
          id,
        };
        years.push(year);
      });
    res.json(years);
  } catch (err) {
    res.status(500).json({
      message: err,
      success: false,
    });
  }
}
export async function getYear(req: Request, res: Response) {
  try {
    let { year } = req.params;
    let { page } = req.params;
    !page ? (page = '1') : (page = page);
    const bodyResponse = await axios.get(`${urls.main}/year/${year}?page=${page}`);
    const $ = cheerio.load(bodyResponse.data);
    const animes = [];

    $('.animes .container .row article').each((i, e) => {
      let el = $(e);

      let id = el.find('a').attr('href');
      id = id.split('/')[4];
      let title = el.find('.Title').text();
      let img = el.find('.Image img').attr('src');
      let category = el.find('.category').text();
      category = category.substring(1, category.length);
      let year = parseInt(el.find('.fecha').text());

      const anime = {
        id,
        title,
        img,
        category,
        year,
      };

      animes.push(anime);
    });

    let totalPages: any = $('.pagination').children().length;
    totalPages = $('.pagination').find('.page-item')[totalPages - 2];
    let pages = parseInt($(totalPages).text());

    let current = parseInt(page);
    res.status(200).json({
      current,
      pages,
      animes,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}
export async function getLetters(req: Request, res: Response) {
  try {
    const bodyResponse = await axios.get(`${urls.main}/animes`);
    const $ = cheerio.load(bodyResponse.data);
    const letters = [];
    let lettersContainer = $('.filter-container .clearfix .float-left')[3];
    $(lettersContainer)
      .find('.dropdown-menu .dropdown-item')
      .each((i, e) => {
        let el = $(e);
        let title = el.text();
        let id = el.attr('href');
        id = id.split('/')[2];
        let letter = {
          title,
          id,
        };
        letters.push(letter);
      });

    res.status(200).json(letters);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}
export async function getBy(req: Request, res: Response, multiple?) {
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

    let totalPages: any = $('.pagination').children().length;
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

// export {

//     getAnime,
//     getAnimes,
//     searchAnime,
//     getEpisode,
//     getCategories,
//     getGenders,
//     getGender,
//     getYears,
//     getYear,
//     getLetters,
//     getBy
// };
