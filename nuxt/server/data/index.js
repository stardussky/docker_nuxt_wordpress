const express = require('express')
const router = express.Router()
// const axios = require('../plugins/axios')

router.get('/*', function (req, res) {
    res.json({
        status: 500,
        error: 'api not found'
    })
})

module.exports = router
