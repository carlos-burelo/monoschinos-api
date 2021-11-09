import axios from 'axios';
import { getAttr, urls } from '../config.js';
import { parse } from 'node-html-parser';

export async function getEpisode(req, res) {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${urls.episode}/${id}`);
    const html = parse(data);
    const map = {
      Anterior: true,
      Siguiente: true,
    };
    const videos = html.querySelectorAll('.TPlayer.mt-3.mb-3 .TPlayerTb').map((i) => {
      const tag = parse(i.text);
      return tag.querySelector('iframe')?.attributes['src'];
    });
    const servers = html.querySelectorAll('#downloads table tbody tr').map((i) => {
      return {
        name: getAttr(i, 'a', 'href').match(/\/\/(.+)\//)[1],
        url: getAttr(i, 'a', 'href'),
      };
    });
    const ctrls = {};
    html.querySelectorAll('.d-flex.justify-content-center.mb-4 a').forEach((i) => {
      const id = i.text.replace(/\s/g, '');
      let key;
      id == 'Siguiente' ? (key = 'next') : id == 'Anterior' ? (key = 'prev') : 'menu';
      ctrls[key] = map[id];
    });
    delete ctrls['menu'];
    res.json({
      title: html.querySelector('.Title-epi').text,
      no: parseInt(id.split('-').pop()) || 0,
      animeId: getAttr(html, 'a.btnWeb.green.Current', 'href').replace(
        'https://monoschinos2.com/anime/',
        ''
      ),
      videos: videos.filter((i) => i !== undefined),
      servers,
      ctrls,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
