import { attr, api, parser } from '../api.js'
import type { Controller } from '../types.d.js'

export const getEpisode: Controller = async (req, res) => {
  try {
    const { id } = req.params
    const html = await parser(api.episode(id))
    const ctrls = html.querySelectorAll('.controldiv2 a')
    let nav = {}
    let mapc = ctrls.map((e, i) => {
      let elem = e.querySelector('img')?.classList
      return !elem?.contains('playlist')
    })
    if (mapc.length == 3) {
      nav = { next: true, prev: true }
    } else {
      if (mapc[1] == true) nav = { next: true, prev: false }
      if (mapc[1] == false) nav = { next: false, prev: true }
    }
    const nextEpisodes = html.querySelectorAll('.nextplay:nth-child(1) .nextplays a').map(i => {
      return {
        image: attr(i, '.nxtmainimg', 'src'),
        date: i.querySelector('.nxtplaybtn p')?.text,
        title: i.querySelector('.nxtplaybtn h5')?.text,
        no: i.querySelector('.nxtplaybtn span')?.text,
      }
    })
    const imgNotFound =
      'https://konachan.com/image/bbb46f65d3130526c20fcd781d6800cf/Konachan.com%20-%2041974%20fuura_kafuka%20itoshiki_nozomu%20sayonara_zetsubou_sensei%20white.png'
    res.json({
      title: html.querySelector('.heromain_h1')?.text.replace(/Sub\sEspañol/gi, ''),
      nextEpisodes: nextEpisodes.length == 0 ? null : nextEpisodes,
      ctrs: nav,
      sugestions: html.querySelectorAll('.nextplay:nth-child(3) .nextplays a').map(i => {
        const image = attr(i, '.nxtmainimg', 'src')
        return {
          image: image.length == 0 || !image ? imgNotFound : image,
          date: i.querySelector('.nxtplaybtn p')?.text,
          title: i.querySelector('.nxtplaybtn h5')?.text,
          no: i.querySelector('.nxtplaybtn span')?.text,
        }
      }),
      videos: html.querySelectorAll('.dropcaps .play-video').map(i => {
        const base64 = i.attrs['data-player']
        const title = i.rawText
        return {
          title,
          url: Buffer.from(base64, 'base64').toString('ascii'),
        }
      }),
      downloads: html.querySelectorAll('.downbtns a').map(i => {
        return {
          title: i.text,
          url: i.attrs['href'],
        }
      }),
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
