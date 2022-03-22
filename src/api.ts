import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import { parse } from 'node-html-parser'
import { API } from './types'

export const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
}

export const url = 'https://monoschinos2.com'

export const api: API = {
  home: `${url}`,
  all: id => `${url}/animes?p=${id}`,
  emision: id => `${url}/emision?p=${id}`,
  calendar: `${url}/calendario`,
  search: (id, page) => `${url}/buscar?q=${id.replace(/\s/g, '+')}&p=${page}`,
  anime: id => `${url}/anime/${id}`,
  episode: id => `${url}/ver/${id}`,
  gender: id => `${url}/genero/${id}`,
  filter: ({ categoria, fecha, genero, letra, pagina }) =>
    `${url}/animes?categoria=${categoria}&genero=${genero}&fecha=${fecha}&letra=${letra}&p=${pagina}`,
}

export function get(url: string) {
  return axios.get(url, { headers })
}

export function attr(
  html: HTMLElement | any,
  selector: string,
  attribute: string | undefined = 'src'
) {
  return html.querySelector(selector)?.attributes[attribute as any] as unknown as string
}
export const cache = (req: Request, res: Response, next: NextFunction) => {
  const period = 60 * 5
  res.set('Cache-control', `public, max-age=${period}`)
  next()
}

export { parse }
