import { attr, api, parser } from '../api'
import { Controller } from '../types'

export const getCalendar: Controller = async (req, res) => {
  try {
    const html = await parser(api.calendar)
    res.status(200).json(
      html.querySelectorAll('.heromain [data-dia]').map(i => {
        const day = i.getAttribute('data-dia')
        return {
          day,
          animes: i.querySelectorAll('.col-md-6.col-lg-4.col-sm-12.for768').map(i => {
            const no = i.querySelector('.serisdtls a h4')?.text.trim()
            const tags = i.querySelectorAll('.serisdtls .seriesbtns a')
            return {
              id: attr(i, 'a', 'href').split('/').pop() || null,
              title: i.querySelector('.serisdtls a h3')?.text.trim() || null,
              image: attr(i, '.seriesimg a img') || null,
              tags: tags.map(i => i.querySelector('button')?.text.trim() || null),
              no: parseInt(no?.replace(/\w+\s/, '') as string) || null,
            }
          }),
        }
      })
    )
  } catch (error) {
    res.status(500).json({ error })
  }
}
