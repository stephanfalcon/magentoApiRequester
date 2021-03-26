const axios = require('axios')
const fs = require('fs')
const scraper = require("./scraper.js")
const pretty = require('pretty')
// pretty much as good as axios but needs parsing first
// const fetch = require('node-fetch') 

const url = "https://staging3.entretek.com/rest/default/V1/products/"
const mediaUrl = "https://staging3.entretek.com/rest/all/V1/products/pro90-4k-1-1/media/4323"
const token = "13y20n0rg075ebk2pn27n8pos2qloh6y"
const headers = {headers:{'Authorization':`Bearer ${token}`}}
const keyy = 'price'
const value = '250'
const product = {'product':{[keyy]:value}}
const entry = {
    "entry":{
        "id": 4323,
        "media_type": "image",
        "label": "javascript test",
        "position": 1,
        "disabled": false,
        "types": [
            "image",
            "small_image",
            "thumbnail",
            "swatch_image"
        ]
    }
}


const getFunc = (item) => {
    axios.get(url+item,headers)
    .then((res)=>{
        let metaTitle = res.data.custom_attributes[1].value
        console.log(metaTitle)
        let mediaArray = res.data.media_gallery_entries
        mediaArray.forEach((ele)=>{
            console.log(ele)
        })
        // putMedia(item,metaTitle)
    })
    .catch((error)=>{
        console.error(error)
    })
}

const putFunc = (item,product) => {
    axios.put(url+item ,entry,headers)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((error)=>{
        console.error(error)
    })
}

const putMedia = (item,entry) => {
    axios.put(mediaUrl,entry,headers)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((error)=>{
        console.error(error)
    })
}

const skuArray = () => {
    const products = fs.readFileSync('./products.txt','utf-8')
    let skuArray = products.split("\r\n")

    return skuArray
}


const productLoop = () => {

    scraper().forEach((element) =>{
        axios.get(url+element,headers)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((error)=>{
            console.error(error)
            return
        })
    })
}

const jsonWriter = (product) => {
    fs.appendFile("./products.json",pretty(JSON.stringify(product)),(err)=>{
        if(err) throw err
        console.log("writen")
    })
}

const imageAtlLoop = () => {
    putMedia()
}



getFunc("pro90-4k-1-1")
// productLoop()
// imageAtlLoop()