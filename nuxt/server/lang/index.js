const express = require('express')
const router = express.Router()
const axios = require('../plugins/axios')

const getLanguages = axios.get('/wp-json/api/languages').then(({ data }) => {
    if (data.status === 200) {
        return Object.keys(data.data)
    }
})

const reduceData = (acc, { status, value }, i) => {
    if (status === 'fulfilled') {
        const { data: { status, data, error } } = value

        const originData = acc.data[this.locales[i]]

        if (originData) {
            acc.data[this.locales[i]] = {
                ...originData,
                ...data,
            }
        } else {
            acc.data[this.locales[i]] = data
        }

        if (status !== 200) {
            acc.status = status
            acc.error = error || 'Wordpress Api Has Wrong'
        }
    } else {
        acc.error = 'Wordpress Route Not Found'
    }
    return acc
}

const mergeApiData = async (page = 'index', mergeData) => {
    this.locales = await getLanguages
    const results = await Promise.allSettled(this.locales.map(locale => axios.get(`${locale}/wp-json/api/${page}`)))

    mergeData = mergeData || {
        status: 200,
        data: this.locales.reduce((acc, key) => {
            acc[key] = {}
            return acc
        }, {}),
    }

    return results.reduce(reduceData, mergeData)
}

router.get('/index', async (req, res) => {
    const data = await mergeApiData('index', {
        status: 200,
        data: {
            zh: {
                lang: '中文',
                about: '關於',
                news: '最新消息',
                doc: '文件',
            },
            en: {
                lang: 'EN',
                about: 'About',
                news: 'News',
                doc: 'Documentation',
            },
        },
    })
    res.json(data)
})

router.get('/news', async (req, res) => {
    const data = await mergeApiData('news')
    res.json(data)
})

router.get('/news-post/:post', async (req, res) => {
    const { post } = req.params

    const data = await mergeApiData(`news-post/${encodeURIComponent(post)}`)
    res.json(data)
})

router.get('/about', (req, res) => {
    res.json({
        status: 200,
        data: {
            zh: {
                greet: '嗨 關於',
            },
            en: {
                greet: 'HI about',
            },
        },
    })
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
