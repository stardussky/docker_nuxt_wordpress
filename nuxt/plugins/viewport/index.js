import { mapState } from 'vuex'
import { debounce } from 'lodash'
import { detect } from 'detect-browser'
import mobileInnerHeight from './mobileInnerHeight'
let innerHeight

const moduleName = 'viewport'
const getterKeys = ['vpWidth', 'vpHeight', 'device', 'mediaType', 'isDesktop', 'isTablet', 'isMobile', 'isPc', 'isIE']

const storeModule = {
    namespaced: true,
    state: () => getterKeys.reduce((acc, curr) => {
        acc[curr] = null
        return acc
    }, {}),
    mutations: {
        SET_INFORMATION (state, payload) {
            for (const [key, value] of Object.entries(payload)) {
                if (state[key] !== undefined) {
                    state[key] = value
                }
            }
        }
    }
}

class Viewport {
    constructor (store) {
        this.store = store
        this.information = {
            width: 0,
            height: 0,
            device: null,
            media: {
                mobile: '(max-width: 767px)',
                tablet: '(max-width: 1199px) and (min-width: 768px)',
                desktop: '(min-width:1200px)'
            }
        }
        this.store.registerModule(moduleName, storeModule)

        if (process.browser) {
            innerHeight = mobileInnerHeight()
            this.refresh()
            window.addEventListener('resize', this.refresh)
        }
    }

    refresh = debounce(() => {
        this.vpWidth = window.innerWidth
        this.vpHeight = innerHeight()
        this.device = detect()

        this.store.commit(`${moduleName}/SET_INFORMATION`, this.info)

        this.onResize?.()
    }, 200)

    destroy () {
        this.store.unregisterModule(moduleName)

        window.removeEventListener('resize', this.refresh)
    }

    get info () {
        return getterKeys.reduce((acc, curr) => {
            acc[curr] = this[curr]
            return acc
        }, {})
    }

    set vpWidth (value) {
        this.information.width = value
    }

    get vpWidth () {
        return this.information.width
    }

    set vpHeight (value) {
        this.information.height = value
    }

    get vpHeight () {
        return this.information.height
    }

    set device (value) {
        this.information.device = value
    }

    get device () {
        return this.information.device
    }

    get mediaType () {
        if (process.browser) {
            const map = this.information.media
            for (const key in map) {
                if (window.matchMedia(map[key]).matches) {
                    return key
                }
            }
        }
        return null
    }

    get isDesktop () {
        return this.mediaType === 'desktop'
    }

    get isTablet () {
        return this.mediaType === 'tablet'
    }

    get isMobile () {
        return this.mediaType === 'mobile'
    }

    get isPc () {
        if (this.device) {
            const { os } = this.device
            return os !== 'iOS' && os !== 'Android OS'
        }
        return null
    }

    get isIE () {
        if (this.device) {
            const { name } = this.device
            return name === 'ie'
        }
        return null
    }
}

export const viewport = getterKeys.reduce((acc, curr) => {
    acc[curr] = mapState(moduleName, { [curr]: state => state[curr] })
    return acc
}, {})

export default ({ store }, inject) => {
    const vp = new Viewport(store)
    inject('viewport', vp)
}
