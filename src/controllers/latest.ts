import type { Controller } from '../types.d.js'
import { parser, attr, url } from '../api.js'

export const getLatest: Controller = async (_, res) => {
  try {
    const html = await parser(url)
    res.json(
      html.querySelectorAll('.row.row-cols-5 .col.col-md-6.col-lg-2.col-6').map(i => {
        const id = attr(i, 'a', 'href').split('/').pop()
        return {
          id: id || null,
          title: i.querySelector('.animetitles')?.text || null,
          image: attr(i, 'img.animeimghv', 'data-src') || null,
          type: i.querySelector('.positioning button')?.text.trim() || null,
          no: parseInt(i.querySelector('.positioning p')?.text.trim() || '0') || null,
        }
      })
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}
