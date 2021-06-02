const express = require('express')
const router = express.Router()
const axios = require('../plugins/axios')
const mergeApiData = require('../functions/mergeApiData')

router.get('/global_options', async (req, res) => {
    const data = await mergeApiData('global_options')
    res.json(data)
})

router.get('/*', function (req, res) {
    res.json({
        status: 500,
        error: 'Data Api Not Found',
    })
})

module.exports = router
