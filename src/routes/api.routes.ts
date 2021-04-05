import { Router } from 'express';


const routes = Router();

import { getEmision, getLastest, getAnime } from '../controllers/controller'



routes.get('/lastest', (req, res) => {
   getLastest(req, res);
})
routes.get('/emision', (req, res) => {
    getEmision(req, res);
})

routes.get('/anime/:id', (req, res) => {
   getAnime(req, res);
})
export default routes