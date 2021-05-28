const express = require('express')
const app = express()
const lang = require('./lang')
const data = require('./data')

app.get('/', (req, res) => {
    res.send('api success')
})

app.use('/lang', lang)
app.use('/data', data)

module.exports = {
    path: '/api',
    handler: app,
}
