import { Controller } from '../types'
import { get, parse, attr, url } from '../api'

export const getLatest: Controller = async (req, res) => {
  try {
    const { data } = await get(url)
    const html = parse(data)
    res.json(
      html.querySelectorAll('.row.row-cols-5 .col.col-md-6.col-lg-2.col-6').map(i => {
        const id = attr(i, 'a', 'href').split('/').pop()
        return {
          id: id || null,
          title: i.querySelector('.animetitles')?.text || null,
          image: attr(i, '.animeimgdiv img', 'data-src') || null,
          type: i.querySelector('.positioning button')?.text.trim() || null,
          no: parseInt(i.querySelector('.positioning h5')?.text.trim() || '0') || null,
        }
      })
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}
