import { api, attr, parser } from '../api.js'
import type { Controller } from '../types.d.js'

export const filterBy: Controller = async (req, res) => {
  try {
    const {
      categoria = 'false',
      fecha = 'false',
      genero = 'false',
      letra = 'false',
      pagina = '1',
    }: { [key: string]: any } = req.query
    const html = await parser(api.filter({ categoria, fecha, genero, letra, pagina }))
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
