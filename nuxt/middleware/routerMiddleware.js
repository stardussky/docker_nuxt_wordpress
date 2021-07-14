export default async function ({ app, route, store, ...context }) {
    for (const meta of route.meta) {
        if (typeof meta.api === 'function' && meta.api(route) === false) return
        if (meta.api === false) return
    }

    await app.$setLocaleData(app.getRouteBaseName(route), route)
}
