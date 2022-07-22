import type { Controller } from '../types.d.js'

export const FembedRaw: Controller = async (req, res) => {
  try {
    const { id } = req.params
    const request = await fetch(`https://fembed.com/api/source/${id}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        'Allow-Control-Allow-Origin': '*',
      },
      method: 'POST',
    })
    console.log(request)
    const response = await request.json()
    console.log(response)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error })
  }
}
