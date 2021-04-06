import { Router } from 'express';
const routes = Router();
import { 
   getEmision, 
   getLastest, 
   getAnime, 
   searchAnime, 
   getEpisode, 
   getGenders, 
   getCategories, 
   getYears 
} from '../controllers/controller'


routes.get('/lastest', (req, res) => {
   getLastest(req, res);
})
routes.get('/emision', (req, res) => {
   getEmision(req, res);
});
routes.get('/anime/:id', (req, res) => {
   getAnime(req, res);
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

export default routes