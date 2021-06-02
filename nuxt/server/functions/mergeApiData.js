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

module.exports = mergeApiData
