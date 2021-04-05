import { Router } from 'express';


const routes = Router();

import { getEmision, getLastest, getAnime, searchAnime } from '../controllers/controller'



routes.get('/lastest', (req, res) => {
   getLastest(req, res);
})
routes.get('/emision', (req, res) => {
    getEmision(req, res);
});

routes.get('/anime/:id', (req, res) => {
   getAnime(req, res);
});
routes.get('/search/:id', (req, res) => {
   searchAnime(req, res);
})
export default routes