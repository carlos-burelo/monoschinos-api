import axios from 'axios';
import { parse } from 'node-html-parser';
import { urls } from '../config.js';

export async function getYears(req, res) {
  try {
    const { data } = await axios.get(`${urls.main}/animes`);
    const html = parse(data);
    res.status(200).json(
      html
        .querySelectorAll('div[aria-labelledby="yearMenuButton"] a')
        .map((i) => {
          return {
            name: i.text.trim(),
            id: i?.attributes['href'].replace('/year/', ''),
          };
        })
        .filter((i) => i.id !== '')
    );
  } catch (err) {
    res.status(500).json({
      message: err,
      success: false,
    });
  }
}
