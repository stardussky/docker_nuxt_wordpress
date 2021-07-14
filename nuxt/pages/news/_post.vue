<template>
    <div class="page-new">
        <div class="container">
            <div class="page-new__title">
                {{ localeData.seo.title }}
            </div>
            <nuxt-link class="button--grey" :to="localePath('/news', $i18n.locale)">
                Back
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'

export default {
    name: 'PageNew',
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.updateRoute(to)
        })
    },
    setup () {
        const route = ref(null)
        const updateRoute = (to) => {
            route.value = {
                params: to.params,
                query: to.query,
            }
        }

        return {
            route,
            updateRoute,
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
            return this.$t(this.$translateUrl('news-post', this.route || this.$route).routeName)
        },
    },
}
</script>

<style lang="scss">

.page-new {
    display: grid;
    width: 100%;
    min-height: 100vh;
    place-items: center;

    .container {
        text-align: center;
    }

    &__title {
        @include typo('heading', 1);

        color: #35495e;
        margin-bottom: 20px;
    }
}
</style>
