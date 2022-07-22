import apicache from 'apicache'
import cors from 'cors'
import express from 'express'
import routes from './router'

const app = express()
const cache = apicache.middleware
app.use(cache('5 seconds', (e: any) => console.log(e)))
app.use(cors())
app.use('/', routes)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.clear()
  console.info(`API Running on: ${port} ============================`)
})
