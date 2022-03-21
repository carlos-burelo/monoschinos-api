import { Request, Response } from 'express'

export type Controller<Type = any> = (req: Request, res: Response) => Promise<Type>

export interface Lastest {
  id: string
  title: string
  image: string
  type: string
  no: number
}
