import { Router } from 'express';
const routes = Router();

import {
  getEmision,
  getLastest,
  getCalendar,
  getAnimes,
  filterBy,
  searchAnime,
  getEpisode,
  getAnime,
} from './controllers/index.js';

routes.get('/', (_, res) => {
  res.json({
    message: 'API Works',
    author: 'Carlos Burelo',
    repository: 'https://github.com/carlos-burelo/monoschinos-api-v2',
    endpoints: {
      lastest: '/lastest',
      emision: '/emision',
      calendar: '/week',
      getAnimeByID: '/anime/:id',
      getAnimesByPage: '/all',
      getEpisodeByID: '/ver/:id',
      searchAnimeByID: '/search/:id',
      filterBy: {
        path: '/filterBy',
        querys: ['categoria', 'fecha', 'genero', 'letra', 'pagina'],
      },
    },
  });
});

routes.get('/lastest', (req, res) => {
  getLastest(req, res);
});
routes.get('/emision', (req, res) => {
  getEmision(req, res);
});
routes.get('/week', (req, res) => {
  getCalendar(req, res);
});
routes.get('/all', (req, res) => {
  getAnimes(req, res);
});
routes.get('/filterBy', (req, res) => {
  filterBy(req, res);
});
routes.get('/search/:id', (req, res) => {
  searchAnime(req, res);
});
routes.get('/ver/:id', (req, res) => {
  getEpisode(req, res);
});
routes.get('/anime/:id', (req, res) => {
  getAnime(req, res);
});

export default routes;
