import { Request, Response } from '@tinyhttp/app'

export type Controller = (req: Request, res: Response) => void

export interface Latest {
  id: string
  title: string
  image: string
  type: string
  no: number
}
export interface API {
  home: string
  all: (id: any) => string
  emision: (id: any) => string
  calendar: string
  search: (id: string, page: any) => string
  anime: (id: string) => string
  episode: (id: string) => string
  gender: (id: string) => string
  filter: ({ categoria, fecha, genero, letra, pagina }: Filters) => string
}

export interface Filters {
  categoria: string
  fecha: string
  genero: string
  letra: string
  pagina: string
}

export interface AnimeBasicFields {
  id: string
  title: string
  image: string
}
