import express from 'express'
import routes from './router'
import { cache } from './api'

const app = express()

app.use(cache)
app.use('/', routes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.clear()
  console.info(`API Running on: ${port} ============================`)
})
