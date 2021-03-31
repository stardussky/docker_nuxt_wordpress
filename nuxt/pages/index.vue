<template>
    <div class="page-index container">
        <div>
            <Logo />
            <h1 class="title">
                Nuxt - {{ localeData.lang }}
            </h1>
            <div class="links">
                <a
                    href="https://nuxtjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button--green"
                >
                    {{ localeData.doc }}
                </a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button--grey"
                >
                    GitHub
                </a>
                <nuxt-link class="button--grey" :to="localePath('/about', $i18n.locale)">
                    {{ localeData.about }}
                </nuxt-link>
            </div>
            <div class="lang">
                <nuxt-link
                    class="button--grey"
                    :to="$switchLocalePath('zh')"
                >
                    中文
                </nuxt-link>
                <nuxt-link
                    class="button--grey"
                    :to="$switchLocalePath('en')"
                >
                    EN
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImagesLoaded from 'imagesloaded'

export default {
    name: 'Index',
    middleware: 'loadingMiddleware',
    head () {
        const i18nSeo = this.$nuxtI18nSeo({ addSeoAttributes: true })
        const { og } = this.localeData
        return {
            title: og?.title,
            htmlAttrs: {
                ...i18nSeo.htmlAttrs
            },
            meta: [
                { hid: 'og:title', property: 'og:title', content: og?.title },
                { hid: 'og:site_name', property: 'og:site_name', content: og?.title },
                { hid: 'name', itemprop: 'name', content: og?.title },
                { hid: 'twitter:title', name: 'twitter:title', content: og?.title },
                { hid: 'description', name: 'description', content: og?.desc },
                { hid: 'og:description', property: 'og:description', content: og?.desc },
                { hid: 'twitter:description', name: 'twitter:description', content: og?.desc },
                { hid: 'og:url', property: 'og:url', content: `${process.env.APP_URL}/${this.getRouteBaseName(this.$route)}` },
                { hid: 'og:image', property: 'og:image', content: og?.thumb },
                { hid: 'twitter:image', name: 'twitter:image', content: og?.thumb },
                { hid: 'image', itemprop: 'image', content: og?.thumb },
                ...i18nSeo.meta
            ],
            link: [
                ...i18nSeo.link
            ]
        }
    },
    computed: {
        localeData () {
            return this.$t('index')
        }
    },
    mounted () {
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

.page-index {
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

    .subtitle {
        padding-bottom: 15px;
        font-size: 42px;
        font-weight: 300;
        color: #526488;
        word-spacing: 5px;
    }

    .links {
        padding-top: 15px;
    }

    .lang {
        margin-top: 30px;
    }
}
</style>
