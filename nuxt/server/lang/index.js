const express = require('express')
const router = express.Router()
const axios = require('../plugins/axios')
const mergeApiData = require('../functions/mergeApiData')

router.get('/index', async (req, res) => {
    const data = await mergeApiData('index', {
        status: 200,
        data: {
            zh: {
                lang: '中文',
                doc: '文件',
            },
            en: {
                lang: 'EN',
                doc: 'Documentation',
            },
        },
    })
    res.json(data)
})

router.get('/about', async (req, res) => {
    const data = await mergeApiData('about')
    res.json(data)
})

router.get('/news', async (req, res) => {
    const data = await mergeApiData('news')
    res.json(data)
})

router.get('/news-post/:post', async (req, res) => {
    const { post } = req.params

    const data = await mergeApiData(`news-post/${encodeURIComponent(decodeURIComponent(post))}`)
    res.json(data)
})

router.get('/all/*', (req, res) => {
    res.json({
        status: 200,
        data: {
            zh: {
                message: '找不到頁面',
            },
            en: {
                message: 'Page Not Found',
            },
        },
    })
})

router.get('/*', function (req, res) {
    res.json({
        status: 500,
        error: 'Language Route Not Found',
    })
})

module.exports = router
