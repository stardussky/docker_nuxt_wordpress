const express = require('express')
const router = express.Router()
const axios = require('../plugins/axios')

const getLanguages = axios.get('/wp-json/api/languages').then(({ data }) => Object.keys(data.data))

router.get('/index', async (req, res) => {
    const locales = await getLanguages
    const results = await Promise.all(locales.map((locale) => {
        return axios.get(`${locale}/wp-json/api/index`)
    }))

    res.json(results.reduce((acc, { data: { code, data } }, i) => {
        const originData = acc.data[locales[i]]
        if (originData) {
            acc.data[locales[i]] = {
                ...originData,
                ...data
            }
        } else {
            acc.data[locales[i]] = data
        }
        if (code !== 200) {
            acc.status = code
            acc.error = 'lang api wrong'
        }
        return acc
    }, {
        status: 200,
        data: {
            zh: {
                lang: '中文',
                about: '關於',
                doc: '文件'
            },
            en: {
                lang: 'EN',
                about: 'About',
                doc: 'Documentation'
            }
        }
    }))
})

router.get('/about', (req, res) => {
    res.json({
        status: 200,
        data: {
            zh: {
                greet: '嗨 關於'
            },
            en: {
                greet: 'HI about'
            }
        }
    })
})

router.get('/all/:pathMatch', (req, res) => {
    res.json({
        status: 200,
        data: {
            zh: {
                message: '找不到路徑'
            },
            en: {
                message: 'Router Not Found'
            }
        }
    })
})

router.get('/*', function (req, res) {
    res.json({
        status: 500,
        error: 'lang route not found'
    })
})

module.exports = router
