const express = require('express')
const router = express.Router()
const axios = require('../plugins/axios')

router.get('/global_options', async (req, res) => {
    const { data } = await axios.get('/wp-json/api/global_options')

    if (data.status === 200) {
        res.json({
            status: data.status,
            data: data.data,
        })
        return
    }
    res.json({ status: 500, error: 'Failed' })
})

router.get('/*', function (req, res) {
    res.json({
        status: 500,
        error: 'Data Api Not Found',
    })
})

module.exports = router
