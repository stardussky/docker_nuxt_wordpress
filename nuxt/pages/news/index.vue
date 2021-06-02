<template>
    <div class="page-news">
        <div class="container">
            <ul class="page-news__cards">
                <li>
                    <nuxt-link
                        v-for="post in localeData.posts"
                        :key="post.ID"
                        class="page-news__card"
                        :to="localePath({ name: 'news-post', params: { post: decodeURIComponent(post.post_name) } }, $i18n.locale)"
                    >
                        <div
                            v-bg="require('@/assets/img/block-map.jpg')"
                            class="page-news__card-image"
                        />
                        {{ post.post_title }}
                    </nuxt-link>
                </li>
            </ul>
            <nuxt-link class="button--grey" :to="localePath('/', $i18n.locale)">
                Back
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { } from '@nuxtjs/composition-api'

export default {
    name: 'PageNews',
    setup () {
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
            return this.$t('news')
        },
    },
}
</script>

<style lang="scss">

.page-news {
    display: grid;
    width: 100%;
    height: 100vh;
    place-items: center;

    .container {
        text-align: center;
    }

    &__card {
        display: block;
        margin: auto;
        max-width: 360px;

        &-image {
            margin-bottom: 15px;

            &::before {
                content: '';
                display: block;
                padding-bottom: 56.25%;
            }
        }
    }

    ul {
        margin-bottom: 20px;
    }
}
</style>
