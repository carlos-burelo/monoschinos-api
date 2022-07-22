import { Router } from 'express'
import {
  FembedRaw,
  filterBy,
  getAll,
  getAnime,
  getCalendar,
  getEmision,
  getEpisode,
  getLatest,
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
      latest: '/latest',
      emision: '/emision',
      calendar: '/week',
      getAnimeByID: '/anime/:id',
      getAnimeByPage: '/all',
      getEpisodeByID: '/ver/:id',
      searchAnimeByID: '/search/:id',
      filterBy: {
        path: '/filterBy',
        query: ['categoria', 'fecha', 'genero', 'letra', 'pagina'],
      },
    },
  })
})

routes.get('/all', getAll)
routes.get('/raw/:id', FembedRaw)
routes.get('/lastest', getLatest)
routes.get(['/lastest', '/latest'], getLatest)
routes.get('/week', getCalendar)
routes.get('/emision', getEmision)
routes.get('/anime/:id', getAnime)
routes.get('/search/:id', searchAnime)
routes.get('/ver/:id', getEpisode)
routes.get('/filterBy', filterBy)

export default routes
