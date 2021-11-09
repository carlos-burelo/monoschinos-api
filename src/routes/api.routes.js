import { Router } from 'express';
const routes = Router();

import {
  getEmision,
  getGenders,
  getLastest,
  getAnime,
  searchAnime,
  getAnimes,
  getEpisode,
  getCategories,
  getYears,
  getBy,
} from '../controllers/index.js';

routes.get('/', (_, res) => {
  res.json({
    message: 'API Works',
  });
});

routes.get('/lastest', (req, res) => {
  getLastest(req, res);
});
routes.get('/emision', (req, res) => {
  getEmision(req, res);
});
routes.get('/anime/:id', (req, res) => {
  getAnime(req, res);
});
routes.get('/animes/:page', (req, res) => {
  getAnimes(req, res);
});
routes.get('/ver/:id', (req, res) => {
  getEpisode(req, res);
});
routes.get('/search/:id', (req, res) => {
  searchAnime(req, res);
});
routes.get('/genders', (req, res) => {
  getGenders(req, res);
});

routes.get('/categories', (req, res) => {
  getCategories(req, res);
});
routes.get('/years', (req, res) => {
  getYears(req, res);
});

routes.get('/letters', (req, res) => {
  getLetters(req, res);
});

routes.get('/by', (req, res) => {
  getBy(req, res);
});
// routes.get('/category/:category/gender/:gender', (req, res) => {
//   getBy(req, res, true);
// });
// routes.get('/gender/:gender', (req, res) => {
//   getBy(req, res);
// });

// routes.get('/letter/:letter', (req, res) => {
//   getBy(req, res);
// });

// routes.get('/category/:category', (req, res) => {
//   getBy(req, res);
// });
export default routes;
