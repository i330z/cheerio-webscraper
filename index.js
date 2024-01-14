const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express();
app.use(express.json());

function downloadPinVid(videoSrc) {
    return new Promise(async (resolve, reject) => {
        const videoUrl = videoSrc;
        try {
            const res = await axios(videoUrl, { timeout: 5000 });
            const html = res.data;
            const $ = cheerio.load(html);
            let url = $('video').attr('src');
            url = url.replace("/hls/", "/720p/").replace(".m3u8", ".mp4");
            console.log(url);
            resolve(url);
        } catch (err) {
            if (err.code === 'ECONNRESET') {

                console.log('Connection reset. Retrying...');

            } else {
                console.error(err);
                reject(err);
            }
        }
    });
}


app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.get('/pinterest/', async function (req, res) {
    const url = req.query.url;

    try {
        const downloadLink = await downloadPinVid(url);
        console.log('download link:', downloadLink);
        res.json({ downloadLink });
    } catch (error) {
        console.error('Error downloading video:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


app.listen(3000)