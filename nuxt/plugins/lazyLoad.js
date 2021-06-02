import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    observer: true,
    attempt: 1,
    silent: process.env.NODE_ENV === 'production',
})
