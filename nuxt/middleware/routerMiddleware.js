export default async function ({ app, route, ...context }) {
    await app.$setLocaleData(app.getRouteBaseName(route), route)
}
