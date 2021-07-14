<template>
    <div class="page-about">
        <div class="container">
            <p class="page-about__title">
                {{ localeData.seo.title }}
            </p>
            <div class="button--green" @click="fetchApi">
                GET API
            </div>
            <nuxt-link class="button--grey" :to="localePath('/', $i18n.locale)">
                Back
            </nuxt-link>
            <Portal :order="isLoading ? 1 : 0" to="loading-ajax">
                <div
                    class="page-about__loading"
                />
            </Portal>
        </div>
    </div>
</template>

<script>
import { ref, useStore, useFetch, onMounted } from '@nuxtjs/composition-api'
import functions from '@/compositions/functions'

export default {
    name: 'About',
    meta: {
        loading: true,
    },
    setup () {
        const store = useStore()
        const { loadImage } = functions()
        const isLoading = ref(false)

        const { fetch, fetchState } = useFetch(async () => {
            const data = await store.dispatch('AJAX', { url: '/api' })
            console.log(data)
        })
        const fetchApi = async () => {
            isLoading.value = true
            store.commit('CHANGE_LOADING_TYPE', 'LOADING_TYPE_AJAX')
            store.dispatch('ADD_LOADING_STACK', new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            }))
            await store.dispatch('WAIT_LOADING')
            isLoading.value = false
        }

        onMounted(() => {
            store.dispatch('ADD_LOADING_STACK', loadImage())
        })

        return {
            isLoading,
            fetchApi,
        }
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

    .container {
        text-align: center;
    }

    &__title {
        @include typo('heading', 1);

        color: #35495e;
        margin-bottom: 20px;
    }

    &__loading {
        @include size(100%);

        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(map-get($colors, white), 0.9);
    }
}
</style>
