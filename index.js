const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')


const app = express()

const url = "https://in.pinterest.com/pin/994591898941709405/"

const links = [];

axios(url)
    .then(res => {
        const html = res.data;


        const $ = cheerio.load(html);
        let url = $('video').attr('src');


        url = url.replace("/hls/", "/720p/").replace(".m3u8", ".mp4");;

        console.log(url)


    }).catch(err => console.log(err))

app.listen(3000)