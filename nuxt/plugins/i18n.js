export default ({ app, store, route, error }, inject) => {
    const { i18n } = app

    app.nuxt.defaultTransition.beforeEnter = () => {
        app.i18n.finalizePendingLocaleChange()
    }

    const translateUrl = (routeName, { params = {}, query = {} } = {}) => {
        let url = `/api/lang/${routeName}`
        let paramsPrefix = ''
        let queryPrefix = ''

        const paramsEntries = Object.entries(params)
        if (paramsEntries.length) {
            let [[key, value]] = paramsEntries
            if (!process.browser) {
                value = encodeURIComponent(value)
            }
            url += `/${value}`
            paramsPrefix += `_${key}${value}`
        }

        const queryEntries = Object.entries(query)
        if (queryEntries.length) {
            url += '?'
            queryPrefix += '_'
            queryEntries.forEach(([key, value]) => {
                if (!process.browser) {
                    value = encodeURIComponent(value)
                }
                url += `${key}=${value}&`
                queryPrefix += `${key}${value}`
            })
        }

        routeName += paramsPrefix + queryPrefix

        return { url, routeName, paramsPrefix, queryPrefix }
    }

    const setLocaleData = async (baseName, request) => {
        const { url, routeName } = translateUrl(baseName, request)
        const temp = store.state.i18n.messages
        const hasTemp = temp[i18n.locale]?.[routeName]

        if (!hasTemp) {
            // server side
            const { status, data, ...res } = await store.dispatch('AJAX', { url })
            if (status === 200) {
                for (const { code: locale } of i18n.locales) {
                    i18n.mergeLocaleMessage(locale, { [routeName]: data[locale] })
                    store.commit('i18n/SET_MESSAGE', {
                        locale,
                        key: routeName,
                        payload: data[locale],
                    })
                }
            } else {
                error({ statusCode: status, message: res.error })
            }
            if (res.error) {
                console.warn(`${status} ${res.error}`)
            }
            return
        }
        // client side
        for (const [locale, data] of Object.entries(temp)) {
            i18n.mergeLocaleMessage(locale, { [routeName]: data[routeName] })
        }
    }

    // client side
    if (process.browser) {
        setLocaleData(app.getRouteBaseName(route), route)
    }

    inject('translateUrl', translateUrl)
    inject('setLocaleData', setLocaleData)
}
