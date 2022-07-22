import { Router } from 'express'
import {
  FembedRaw,
  filterBy,
  getAll,
  getAnime,
  getCalendar,
  getEmision,
  getEpisode,
  getLastest,
  searchAnime,
} from './controllers'

const routes = Router()

routes.get('/', (_, res) => {
  res.json({
    message: 'API Works',
    author: 'Carlos Burelo',
    repository: 'https://github.com/carlos-burelo/monoschinos-api-v2',
    endpoints: {
      lastest: '/lastest',
      raw: '/raw/:id',
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
  })
})

routes.get('/all', getAll)
routes.get('/raw/:id', FembedRaw)
routes.get('/lastest', getLastest)
routes.get('/week', getCalendar)
routes.get('/emision', getEmision)
routes.get('/anime/:id', getAnime)
routes.get('/search/:id', searchAnime)
routes.get('/ver/:id', getEpisode)
routes.get('/filterBy', filterBy)

export default routes
