<template>
    <div class="page-end container">
        <div>
            <Logo />
            <h1 class="title">
                {{ localeData.message }}
            </h1>
            <div class="links">
                <nuxt-link class="button--grey" :to="localePath('/', $i18n.locale)">
                    BACK
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import ImagesLoaded from 'imagesloaded'
import { mapActions } from 'vuex'

export default {
    name: 'PageEnd',
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.route = {
                params: to.params,
                query: to.query
            }
        })
    },
    middleware: 'loadingMiddleware',
    data () {
        return {
            route: null
        }
    },
    computed: {
        localeData () {
            return this.$t(this.$translateUrl('all', this.route || this.$route).routeName)
        }
    },
    mounted(){
        /* eslint-disable no-unused-vars */
        const loader = new ImagesLoaded('#__nuxt', { background: '[data-background]' }, (instance) => {
            this.DONE_LOADING()
        })
    },
    methods: {
        ...mapActions(['DONE_LOADING'])
    }
}
</script>

<style lang='scss'>

.page-end {
    &.container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
    }

    .title {
        display: block;
        font-size: 100px;
        font-family:
            'Quicksand',
            'Source Sans Pro',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            'Helvetica Neue',
            Arial,
            sans-serif;
        font-weight: 300;
        color: #35495e;
        letter-spacing: 1px;
    }
}
</style>
