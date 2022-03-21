import express from 'express'
import routes from './router'

const app = express()

app.use('/', routes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.clear()
  console.info(`API Running on: ${port} ============================`)
})
