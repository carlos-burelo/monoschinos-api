# Monoschinos API

![Banner](https://media.graphcms.com/ZcGixDrxSQmSJHBlB8sK)

[Preview](https://monoschinos-api.up.railway.app/)
## Docs
## Endpoints

> PATH: /latest

|Querys|Params|
|-|-|
|none|none|

```js
[
  {
    "id": "kimetsu-no-yaiba-yuukaku-hen-episodio-1",
    "title": "Kimetsu no Yaiba: Yuukaku-hen",
    "image": "https://monoschinos2.com/assets/img/serie/episodio/kimetsu-no-yaiba-yuukaku-hen-1-1638722630.jpg",
    "type": "Anime",
    "no": 1
  },
  {
    "id": "mushoku-tensei-isekai-ittara-honki-dasu-2nd-season-episodio-10",
    "title": "Mushoku Tensei: Isekai Ittara Honki Dasu 2nd Season",
    "image": "https://monoschinos2.com/assets/img/serie/episodio/mushoku-tensei-isekai-ittara-honki-dasu-2nd-season-10-1638721531.jpg",
    "type": "Anime",
    "no": 10
  },
  ...
]
```


> PATH: /emision

|Querys|Params|
|-|-|
|`page`|none|

```js
[
  {
    "id": "jojos-bizarre-adventure-stone-ocean-sub-espanol",
    "title": "JoJo's Bizarre Adventure: Stone Ocean",
    "image": "https://monoschinos2.com/thumbs/imagen/jojos-bizarre-adventure-stone-ocean-1638350799.jpg?v=1"
  },
  {
    "id": "kimetsu-no-yaiba-yuukaku-hen-sub-espanol",
    "title": "Kimetsu no Yaiba: Yuukaku-hen",
    "image": "https://monoschinos2.com/thumbs/imagen/kimetsu-distrito-rojo.jpg?v=1"
  },
  ...
]
```


> PATH: /week

|Querys|Params|
|-|-|
|none|none|

```js
[
  {
    "day": "lunes",
    "animes": [
      {
        "id": "shinka-no-mi-shiranai-uchi-ni-kachigumi-jinsei-sub-espanol",
        "title": "Shinka no Mi: Shiranai Uchi ni Kachigumi Jinsei",
        "image": "https://monoschinos2.com/thumbs/imagen/shinka-no-mi-shiranai-uchi-ni-kachigumi-jinsei-1637559521.jpg?v=1"
      },
      ...
    ]
  },
  ...
]
```


> PATH: /all

|Querys|Params|
|-|-|
|`page`|none|

```js
[
  {
    "id": "mai-otome-zwei-sub-espanol",
    "title": "Mai-Otome Zwei",
    "image": "https://monoschinos2.com/thumbs/imagen/mai-otome-zwei-1638649807.jpg?v=1"
  },
  {
    "id": "mai-hime-sub-espanol",
    "title": "Mai-HiME",
    "image": "https://monoschinos2.com/thumbs/imagen/mai-hime-1638591018.jpg?v=1"
  },
  ...
]
```


> PATH: /search/:id

|Querys|Params|
|-|-|
|none|`id`|

```js
[
  {
    "id": "mai-otome-zwei-sub-espanol",
    "title": "Mai-Otome Zwei",
    "image": "https://monoschinos2.com/thumbs/imagen/mai-otome-zwei-1638649807.jpg?v=1"
  },
  {
    "id": "mai-hime-sub-espanol",
    "title": "Mai-HiME",
    "image": "https://monoschinos2.com/thumbs/imagen/mai-hime-1638591018.jpg?v=1"
  },
  ...
]
```




> PATH: /filterBy

|Querys|Params|
|-|-|
|`pagina` , `categoria`, `fecha` ,`genero`, `letra`|none|

```js
[
  {
    "id": "mai-otome-zwei-sub-espanol",
    "title": "Mai-Otome Zwei",
    "image": "https://monoschinos2.com/thumbs/imagen/mai-otome-zwei-1638649807.jpg?v=1"
  },
  {
    "id": "mai-hime-sub-espanol",
    "title": "Mai-HiME",
    "image": "https://monoschinos2.com/thumbs/imagen/mai-hime-1638591018.jpg?v=1"
  },
  ...
]
```


> PATH: /ver/:id

|Querys|Params|
|-|-|
|none|`id`|

```js
{
  "title": "Kaifuku Jutsushi no Yarinaoshi. 2 ",
  "nextEpisodes": [
    {
      "image": "https://monoschinos2.com/assets/img/serie/episodio/kaifuku-jutsushi-no-yarinaoshi-3.png",
      "date": "27 Ene 2021",
      "title": "Kaifuku Jutsushi no Yarinaoshi",
      "no": "Capitulo 3"
    }
  ],
  "ctrs": {
    "next": true,
    "prev": true
  },
  "sugestions": [
    {
      "image": "https://monoschinos2.com/thumbs/portada/gundamhathawayvisual-e1621256405818.jpg?v=1.1",
      "date": "08 Jul 2021",
      "title": "Mobile Suit Gundam: Hathaway's Flash",
      "no": "Capitulo 1"
    },
    ...
  ],
  "videos": [
    {
      "title": "cloud",
      "url": "https://monoschinos2.com/reproductor?url=https://repro.monoschinos2.com/aqua/cl?url=redo02.mp4"
    },
    ...
  ],
  "downloads": [
    {
      "title": "1fichier ",
      "url": "https://1fichier.com/?yssqgolputegizq4xkhb"
    },
    ...
  ]
}
```



> PATH: /anime/:id

|Querys|Params|
|-|-|
|none|`id`|

```js
{
  "banner": "https://monoschinos2.com/assets/img/serie/portada/portada_kimetsu-37.jpg",
  "image": "https://monoschinos2.com/thumbs/imagen/crunchyroll-Demon-Slayer-Kimetsu-no-Yaiba-Mugen-Train-Arc.jpg?v=1",
  "title": "Kimetsu no Yaiba: Mugen Ressha-hen (TV)",
  "sinopsis": "Versión para televisión de la película Mugen Train que conecta el arco de Tanjiro Kamado, Resolve inquebrantable con el arco del distrito de entretenimiento , que presenta un episodio original de televisión nunca antes visto de Kyojuro Rengoku asumiendo una nueva misión en el camino hacia el tren Mugen.\nAdemás del episodio completamente nuevo, la serie también incluirá 70 escenas nuevas, nuevas pistas musicales, avances de episodios y nuevos temas musicales.\n",
  "status": "Finalizado",
  "date": 2021,
  "rating": "4.8",
  "genders": [
    "Acción",
    "Aventura",
    "Gore",
    "Shonen",
    "Histórico"
  ],
  "episodes": [
    {
      "image": "https://monoschinos2.com/thumbs/portada/portada_kimetsu-37.jpg?v=1.1",
      "no": 1,
      "id": "kimetsu-no-yaiba-mugen-ressha-hen-tv-episodio-1"
    },
    ...
  ]
}
```


