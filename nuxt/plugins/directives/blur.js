const eventsHandler = []

export default function (Vue, options) {
    function clickOutSide (el, callback, e) {
        const path = e.path || e.composedPath?.()
        const isInside = ~path.indexOf(el)
        if (!isInside) {
            callback(isInside)
        }
    }
    Vue.directive('blur', {
        bind (el, { value }) {
            const event = clickOutSide.bind(this, el, value)
            document.body.addEventListener('click', event)
            eventsHandler.push(event)
        },
        update () {

        },
        unbind () {
            eventsHandler.forEach((e) => {
                document.body.removeEventListener('click', e)
            })
        }
    })
}
