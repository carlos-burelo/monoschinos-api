import { attr, api, get, parse } from '../api'
import { Controller } from '../types'

export const getEmision: Controller = async (req, res) => {
  try {
    const { page = '1' } = req.query
    const { data } = await get(api.emision(page))
    const html = parse(data)
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
