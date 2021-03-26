const axios = require('axios')
const fs = require('fs')
const scraper = require("./scraper.js")
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


const getFunc = () => {
    axios.get(url,headers)
    .then((res)=>{
        console.log(res.data)
        
    })
    .catch((error)=>{
        console.error(error)
    })
}

const putFunc = () => {
    axios.put(url,product ,headers)
    .then((res)=>{
        console.log(res.data)
    })
    .catch((error)=>{
        console.error(error)
    })
}

const putMedia = () => {
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

const imageAtlLoop = () => {
    putMedia()
}




productLoop()
// imageAtlLoop()