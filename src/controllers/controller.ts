import cheerio from 'cheerio';
import axios from 'axios';
import { urls } from '../config';
import { LastestAnimeI, AnimeI, SuggestionI, GenderI, AnimeSearchI, VideosI } from "../models/interfaces";


async function getLastest(req: any, res: any) {
    try {
        const bodyResponse = await axios.get(`${urls.main}`);
        const $ = cheerio.load(bodyResponse.data);

        const animes: any = [];

        let getLastest = $('.container .caps .container')[0];

        $(getLastest).find('.row article').each((i, e) => {
            let el = $(e);
            let title = el.find('.Title').html().split('\t')[0]
            let cover = el.find('.Image img').attr('src');
            let type = el.find('.Image figure span').text();
            type = type.substring(1, type.length)
            let episode: any = el.find('.dataEpi .episode').text();
            episode = parseInt(episode.split('\n')[1])
            let id: any = el.find('a').attr('href');
            id = id.split('/')[4]
            id = id.split('-')
            id.splice(id.length - 2, 2);
            id = `${id.join('-')}-episodio-${episode}`;

            let anime: LastestAnimeI = {
                id,
                title,
                cover,
                episode,
                type
            }

            animes.push(anime);
        })

        res.status(200)
            .json(
                animes
            )

    } catch (err) {
        res.status(500)
            .json({
                message: err.message,
                success: false
            })
    }
}
async function getEmision(req: any, res: any) {
    try {
        let { page } = req.query;
        if (!page) { page = 1 }

        const response = await axios.get(`${urls.emision}${page}`);
        const $ = cheerio.load(response.data);

        let animes: any = [];

        $('.animes .container .row article').each((i, e) => {
            let el = $(e);

            let id = el.find('a').attr('href');
            id = id.split('/')[4]
            let title = el.find('.Title').text();
            let img = el.find('.Image img').attr('src');
            let category = el.find('.category').text();
            category = category.substring(1, category.length)
            let year = parseInt(el.find('.fecha').text());

            const anime = {
                id,
                title,
                img,
                category,
                year
            }

            animes.push(anime);
        })

        let totalPages: any = $('.pagination').children().length;
        totalPages = $('.pagination').find('.page-item')[totalPages - 2];
        let pages = parseInt($(totalPages).text());

        res.status(200),
            res.json(
                animes
            );

    } catch (err) {
        res.json({
            message: err.message,
            success: false
        })
    }
}
async function getAnime(req: any, res: any) {
    try {
        let { id } = req.params;
        const response = await axios.get(`${urls.anime}/${id}`);
        const $ = cheerio.load(response.data);
        let anime: AnimeI = {};
        let genders = []
        let episodes = []
        let sugestions = []
        // Episodes
        $('.SerieCaps').each((i, e) => {
            let el = $(e);
            let totalEpisodes = el.children().length;

            $('.container .SerieCaps .item').each((i, e) => {
                let el = $(e);
                let episodeId = el.attr('href');
                episodeId = episodeId.split('/')[4]
                let episode = {
                    number: totalEpisodes,
                    id: episodeId
                }
                episodes.push(episode)
                episodes[i] = episode;
                anime.episodes = episodes
                totalEpisodes--


            });
        });
        // Genders
        $('.generos a').each((i, e) => {
            let el = $(e);
            let title = el.text();
            let id = el.attr('href').split('/')[4]
            let gender: GenderI = {
                title,
                id
            }
            genders.push(gender)
        })
        // Suggestions
        $('.container .row .col-12 .recom article').each((i, e) => {
            let el = $(e);
            let id = el.find('a').attr('href');
            id = id.split('/')[4]
            let title = el.find('a .Title').text().replace(/ Sub Español/gi, '')
            let cover = el.find('a .Image img').attr('src');
            let year = parseInt(el.find('.fecha').text());

            let sugestionAnime: SuggestionI = {
                id,
                title,
                cover,
                year
            }

            sugestions.push(sugestionAnime);
        });
        // Information
        $('.TPost.Serie.Single').each((i, e) => {
            let el = $(e);
            let banner = el.find('.Banner img').attr('src');
            if (banner == 'https://monoschinos2.com/assets/img/no_image.png') {
                banner = 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg'
            }
            let title = el.find('h1.Title').text().replace(/ Sub Español/gi, '')
            let sinopsis = el.find(' .row .col-sm-9 .Description p').text();
            let status = el.find(' .row .col-sm-9 .Type').text().trim();
            let date1 = el.find(' .row .col-sm-9 .after-title:nth-child(n)').text();
            let date = date1.replace(/ /gi, "").replace(/\n/gi, "").replace(/Finalizado/gi, '').replace(/Estreno/gi, '').slice(0, 10)
            let type1 = date1.replace(/ /gi, "").replace(/\n/gi, "").replace(/Finalizado/gi, '').replace(/Estreno/gi, '').replace(`${date}`, '')
            let type = type1.slice(1, type1.length)
            let cover = el.find('.Image img').attr('src');
            anime = {
                id,
                type,
                title,
                banner,
                sinopsis,
                status,
                date,
                cover,
                genders,
                sugestions,
                episodes
            }
        });
        if (!anime.episodes) {
            anime.episodes = []
        };
        res.json(
            anime
        );
    } catch (err) {
        res.json({
            message: err.message,
            success: false
        });
    };
};
async function searchAnime(req: any, res: any) {
    try {
        let { id } = req.params;
        const response = await axios.get(`${urls.search}${id}`);
        const $ = cheerio.load(response.data);
        let animes = [];
        $('.animes .row article').each((i, e) => {
            let el = $(e);
            let title = el.find('h3.Title').text()
            let cover = el.find('div.Image .cover .img-fluid').attr('src')
            let id1 = el.find('a.link-anime').attr('href');
            let id = id1.split('/')[4];
            let category = el.find('.category').text();
            category = category.substring(1, category.length)
            let year = parseInt(el.find('.fecha').text());

            let anime: AnimeSearchI = {
                id,
                title,
                cover,
                category,
                year
            }
            animes.push(anime);
        })

        res.json(
            animes,
        )

    } catch (err) {
        res.json({
            message: err.message,
            success: false
        })
    }
};
async function getEpisode(req: any, res: any) {
    try {
        let { id } = req.params;
        const response = await axios.get(`${urls.episode}/${id}`);
        const $ = cheerio.load(response.data);
        let epnum = $('.Episode .Title-epi').text();
        let title = $('.Episode .Title-epi').text().replace('Sub Español', '')
        let animeId = id.split('-');
        if (animeId.includes('episodio')) {
            animeId = animeId.splice(0, animeId.length - 2).join('-');
        } else {
            animeId = animeId.splice(0, animeId.length - 1)
        }
        animeId = `${animeId}-sub-espanol`;
        let number: any = epnum.split(' ');
        number = parseInt(number[number.length - 3]);

        let videos = [];
        let videosContainer = $('.Episode .content .row .TPlayer').text();
        $(videosContainer).each((i, e) => {
            let el = $(e);
            let url = el.attr('src');
            if (url) {
                url = url.split('url=')[1]
                url = decodeURIComponent(url)
                url = url.split('&id')[0]
                let videolinks = new URL(url)
                let { host } = videolinks;
                let name = host
                    .replace('.com', '')
                    .replace('www.', '')
                    .replace('.ru', '')
                    .replace('repro.', '')
                    .replace('.co', '')
                    .replace('.nz', '')
                name = `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
                let servers = {
                    url,
                    name
                }
                videos.push(servers);
            };
        });
        let downloads = [];
        let downloadsContainer = $('#downloads table tbody tr');

        $(downloadsContainer).each((i, e) => {
            let el = $(e);

            let link = el.find('a').attr('href')
            let sn = link.replace('.com', '')
                .replace('www.', '')
                .replace('.ru', '')
                .replace('repro.', '')
                .replace('.co', '')
                .replace('.nz', '')
            let servername = sn.slice(8)
            let svn = servername.indexOf("/")
            let server = servername.slice(0, svn)
            server = `${server.slice(0, 1).toUpperCase()}${server.slice(1)}`
            let down = {
                server,
                link
            }
            if (down) {
                downloads.push(down)
            }

        })

        res.json({
            title,
            animeId,
            number,
            videos,
            downloads,
        })

    } catch (err) {
        res.status(500)
            .json({
                message: err.message,
                success: false
            })
    }
}
async function getGenders(req, res) {
    try {
        const response = await axios.get(`${urls.main}/animes`);
        const $ = cheerio.load(response.data);

        let genders = []

        let gendersContainer = $('.filter-container .clearfix .float-left')[1];

        $(gendersContainer).find('.dropdown-menu .dropdown-item').each((i, e) => {
            let el = $(e)

            let title = el.text();
            if (title.charAt(0) == ' ') {
                title = title.substring(1, title.length)
            }
            let id = el.attr('href');
            id = id.split('/')[2];
            let gender: GenderI = {
                title,
                id
            }
            genders.push(gender)
        })
        res.json(
            genders,
        )

    } catch (err) {
        res.status(500)
            .json({
                message: err,
                success: false
            })
    }
}


export {
    getLastest,
    getEmision,
    getAnime,
    searchAnime,
    getEpisode,
    getGenders,
}