import { api, attr, get, parse } from '../api'
import { Controller } from '../types'

export const filterBy: Controller = async (req, res) => {
  try {
    const {
      categoria = 'false',
      fecha = 'false',
      genero = 'false',
      letra = 'false',
      pagina = '1',
    }: { [key: string]: any } = req.query
    const { data } = await get(api.filter({ categoria, fecha, genero, letra, pagina }))
    const html = parse(data)
    res.status(200).json(
      html.querySelectorAll('.heromain .row .col-md-4.col-lg-2.col-6').map(i => {
        return {
          id: attr(i, 'a', 'href').split('/').pop() || null,
          title: i.querySelector('.seristitles')?.text.trim() || null,
          image: attr(i, '.animemainimg', 'src') || null,
        }
      })
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}
