import { App } from '@tinyhttp/app'
import routes from './router.js'
import { cors } from '@tinyhttp/cors'
import { cache } from './cache.js'

const app = new App()

app.use(cors())
app.use(cache)
app.use('/', routes)

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000

app.listen(port, () => console.log(`Server running on port ${port}`))