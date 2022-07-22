import { attr, api, parser } from '../api.js'
import type { Controller } from '../types.d.js'

export const getEmision: Controller = async (req, res) => {
  try {
    const { page = '1' } = req.query
    const html = await parser(api.emision(page))
    res.status(200).json(
      html.querySelectorAll('.heromain .row .col-md-4.col-lg-2.col-6').map(i => {
        return {
          id: attr(i, 'a', 'href').split('/').pop() || null,
          title: i.querySelector('.seristitles')?.text.trim() || null,
          image: attr(i, '.animemainimg') || null,
        }
      })
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}
