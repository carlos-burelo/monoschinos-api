const appConfig = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8000
}
const page = "https://monoschinos2.com";

const urls = {
    main: page,
    emision:  page +'/emision?page=',
    search: page +'/search?q=',
    anime: page +'/anime',
    episode: page +'/ver',
    gender: page +'/genero',
    letter: page +'/letra',
    ova: page +'/categoria/ova'
}

export {
    urls,
    appConfig
}
