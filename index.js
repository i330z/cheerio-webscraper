const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')


const app = express()

const url = "https://www.assamcareer.com/"

const links = [];

axios(url)
    .then(res =>{
        const html = res.data;
       
        const $ = cheerio.load(html);
        
        $('.post-outer').each(function () {
            const headline = $(this).find('.post-title a').text();
            const postUrl = $(this).find('.post-body a').attr('href');
            links.push({
                headline, postUrl
            })
            console.log(links)
        })

        links.forEach((e)=>{
            axios(e.postUrl)
                .then(res =>{
                    const pageData = res.data;
                    // console.log(pageData)
                    const $ = cheerio.load(pageData)
                    $('.post-outer', pageData).each(function(){
                        const articleBody = $(this).find('#PostBody').text();
                        console.log(articleBody)
                    })

                })
        })

    }).catch(err=> console.log(err))

app.listen(3000)