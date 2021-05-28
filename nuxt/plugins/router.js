export default function ({ app, route, store, ...context }) {
    app.router.options.scrollBehavior = (to, from, savedPosition) => {
        if (to.meta.loading) {
            store.dispatch('ADD_LOADING_STACK', new Promise((resolve) => { resolve() }))
        }
        return savedPosition || { x: 0, y: 0 }
    }
}
