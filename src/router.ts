import { Router } from 'express'
import {
  getAll,
  getLatest,
  getCalendar,
  getEmision,
  getAnime,
  searchAnime,
  getEpisode,
  filterBy,
} from './controllers'

const routes = Router()

routes.get('/', (_, res) => {
  res.json({
    message: 'API Works',
    author: 'Carlos Burelo',
    repository: 'https://github.com/carlos-burelo/monoschinos-api-v2',
    endpoints: {
      latest: '/latest',
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
routes.get(['/lastest', '/latest'], getLatest)
routes.get('/week', getCalendar)
routes.get('/emision', getEmision)
routes.get('/anime/:id', getAnime)
routes.get('/search/:id', searchAnime)
routes.get('/ver/:id', getEpisode)
routes.get('/filterBy', filterBy)

export default routes
