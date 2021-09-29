import { Router } from 'express';
const routes = Router();
import {
  getAnime,
  getAnimes,
  searchAnime,
  getEpisode,
  getGenders,
  getGender,
  getCategories,
  getYears,
  getYear,
  getLetters,
  getBy,
} from '../controllers/controller';

import { getEmision, getLastest } from '../controllers';

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
routes.get('/gender/:gender/:page', (req, res) => {
  getGender(req, res);
});
routes.get('/categories', (req, res) => {
  getCategories(req, res);
});
routes.get('/years', (req, res) => {
  getYears(req, res);
});
routes.get('/year/:year/:page', (req, res) => {
  getYear(req, res);
});
routes.get('/letters', (req, res) => {
  getLetters(req, res);
});
routes.get('/category/:category/gender/:gender', (req, res) => {
  getBy(req, res, true);
});
routes.get('/gender/:gender', (req, res) => {
  getBy(req, res);
});

routes.get('/letter/:letter', (req, res) => {
  getBy(req, res);
});

routes.get('/category/:category', (req, res) => {
  getBy(req, res);
});
export default routes;
