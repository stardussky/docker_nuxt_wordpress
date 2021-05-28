export default async function ({ app, route, store, ...context }) {
    await app.$setLocaleData(app.getRouteBaseName(route), route)
}
