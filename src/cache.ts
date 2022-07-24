import expeditius, { ExpeditiousOptions } from 'express-expeditious'

const cacheOptions: ExpeditiousOptions = {
  namespace: 'monoschinos',
  defaultTtl: '5 minute',
  statusCodeExpires: {
    404: '1 minute',
    500: 0
  }
}
export const cache: any = expeditius(cacheOptions)