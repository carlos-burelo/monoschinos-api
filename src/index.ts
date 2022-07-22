import { App } from '@tinyhttp/app'
import routes from './router'
import { lruSend as cache } from 'lru-send'
import { cors } from '@tinyhttp/cors'


const app = new App()
app.use(cache())
app.use(cors())
app.use('/', routes)

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000

app.listen(port, () => console.log(`Server running on port ${port}`))