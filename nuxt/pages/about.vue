<template>
    <div class="page-about">
        <div>
            <p class="page-about__title">
                {{ localeData.greet }}
            </p>
            <nuxt-link class="button--grey" :to="localePath('/', $i18n.locale)">
                Back
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { useStore, useFetch, onMounted } from '@nuxtjs/composition-api'
import ImagesLoaded from 'imagesloaded'

export default {
    name: 'About',
    meta: {
        loading: true,
    },
    setup () {
        const store = useStore()

        const { fetch, fetchState } = useFetch(async () => {
            const data = await store.dispatch('AJAX', { url: '/api' })
            console.log(data)
        })

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
            return this.$t('about')
        },
    },
}
</script>

<style lang="scss">

.page-about {
    display: grid;
    width: 100%;
    height: 100vh;
    place-items: center;

    > div {
        text-align: center;
    }

    &__title {
        @include typo('heading', 1);

        display: block;
        text-align: center;
        color: #35495e;
        margin-bottom: 20px;
    }
}
</style>
