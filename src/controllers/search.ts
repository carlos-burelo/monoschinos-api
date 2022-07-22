import { api, attr, parser } from '../api.js'
import type { Controller } from '../types.d.js'

export const searchAnime: Controller = async (req, res) => {
  try {
    const { id } = req.params
    const { page = '1' } = req.query
    const html = await parser(api.search(id, page))
    res.json(
      html.querySelectorAll('.heromain .row .col-md-4.col-lg-2.col-6').map(i => {
        return {
          id: attr(i, 'a', 'href').split('/').pop() || null,
          title: i.querySelector('.seristitles ')?.text || null,
          image: attr(i, '.seriesimg .animemainimg', 'src') || null,
        }
      })
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}
