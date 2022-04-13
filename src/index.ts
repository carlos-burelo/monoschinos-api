import cors from 'cors'
import express from 'express'
import { cache } from './api'
import routes from './router'

const app = express()

app.use(cache)
app.use(cors())
app.use('/', routes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.clear()
  console.info(`API Running on: ${port} ============================`)
})
