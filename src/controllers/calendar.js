
import { parse } from 'node-html-parser';
import { attr, api } from '../config.js';
import axios from 'axios';

export async function getCalendar(req, res) {
  try {
    const { data } = await axios.get(api.calendar);
    const html = parse(data);
    res.status(200).json(
      html.querySelectorAll('.heromain [data-dia]').map((i) => {
        const day = i.getAttribute('data-dia');
        return {
          day,
          animes: i
            .querySelectorAll('.col-md-6.col-lg-4.col-sm-12.for768')
            .map((i) => {
              return {
                id: attr(i, 'a', 'href').split('/').pop() || null,
                title: i.querySelector('.serisdtls a h3').text.trim() || null,
                image: attr(i, '.seriesimg a img') || null,
              };
            }),
        };
      })
    )
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
