import axios from 'axios';
import { parse } from 'node-html-parser';
import { api, attr } from '../config.js';

export async function filterBy(req, res) {
  try {
    let {
      categoria = 'false',
      fecha = 'false',
      genero = 'false',
      letra = 'false',
      pagina = '1',
    } = req.query;
    const { data } = await axios.get(`${api.filter({ categoria, fecha, genero, letra, pagina })}`);
    const html = parse(data);
    res.status(200).json(
      html.querySelectorAll('.heromain .row .col-md-4.col-lg-2.col-6').map((i) => {
        return {
          id: attr(i, 'a', 'href').split('/').pop() || null,
          title: i.querySelector('.seristitles').text.trim() || null,
          image: attr(i, '.animemainimg', 'src') || null,
        };
      })
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
