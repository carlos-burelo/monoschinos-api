import { App } from '@tinyhttp/app'
import routes from './router.js'
import { cors } from '@tinyhttp/cors'

const app = new App()

app.use(cors())
app.use('/', (_, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=300')
  next()
})
app.use('/', routes)

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000

app.listen(port, () => console.log(`Server running on port ${port}`))