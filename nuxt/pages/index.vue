<template>
    <div class="page-index">
        <div class="container">
            <div>
                <Logo />
                <h1 class="page-index__title">
                    Nuxt - {{ localeData.lang }}
                </h1>
                <div class="page-index__links">
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
                </div>
                <div class="page-index__lang">
                    <nuxt-link
                        class="button--grey"
                        :to="switchLocalePath('zh')"
                    >
                        中文
                    </nuxt-link>
                    <nuxt-link
                        class="button--grey"
                        :to="switchLocalePath('en')"
                    >
                        EN
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore, onMounted } from '@nuxtjs/composition-api'
import ImagesLoaded from 'imagesloaded'

export default {
    name: 'PageIndex',
    meta: {
        loading: true,
    },
    setup () {
        const store = useStore()

        onMounted(() => {
            store.dispatch('ADD_LOADING_STACK', new Promise((resolve) => {
                new ImagesLoaded('#__nuxt', { background: '[data-background]' }, (instance) => {
                    resolve()
                })
            }))
        })
    },
    head () {
        const i18nSeo = this.$nuxtI18nHead({ addSeoAttributes: true })
        const { seo } = this.localeData
        return {
            title: seo?.title,
            htmlAttrs: {
                ...i18nSeo.htmlAttrs,
            },
            meta: [
                { hid: 'og:title', property: 'og:title', content: seo?.title },
                { hid: 'og:site_name', property: 'og:site_name', content: seo?.title },
                { hid: 'name', itemprop: 'name', content: seo?.title },
                { hid: 'twitter:title', name: 'twitter:title', content: seo?.title },
                { hid: 'description', name: 'description', content: seo?.desc },
                { hid: 'og:description', property: 'og:description', content: seo?.desc },
                { hid: 'twitter:description', name: 'twitter:description', content: seo?.desc },
                { hid: 'og:url', property: 'og:url', content: `${process.env.APP_URL}/${this.getRouteBaseName(this.$route)}` },
                { hid: 'og:image', property: 'og:image', content: seo?.thumb },
                { hid: 'twitter:image', name: 'twitter:image', content: seo?.thumb },
                { hid: 'image', itemprop: 'image', content: seo?.thumb },
                ...i18nSeo.meta,
            ],
            link: [
                ...i18nSeo.link,
            ],
        }
    },
    computed: {
        localeData () {
            return this.$t('index')
        },
    },
}
</script>

<style lang='scss'>

.page-index {
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
    }

    &__title {
        @include typo('display', 1);

        color: #35495e;
    }

    &__links {
        padding-top: 15px;
    }

    &__lang {
        margin-top: 30px;
    }
}
</style>
