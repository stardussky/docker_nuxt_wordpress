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
import { mapActions } from 'vuex'

export default {
    name: 'About',
    async fetch () {
        const data = await this.AJAX({ url: '/api' })
        console.log(data)
    },
    head () {
        const i18nSeo = this.$nuxtI18nSeo({ addSeoAttributes: true })
        return {
            title: 'About',
            htmlAttrs: {
                ...i18nSeo.htmlAttrs
            },
            meta: [
                ...i18nSeo.meta
            ],
            link: [
                ...i18nSeo.link
            ]
        }
    },
    computed: {
        localeData () {
            return this.$t('about')
        }
    },
    methods: {
        ...mapActions(['AJAX'])
    }
}
</script>

<style lang="scss">

.page-about {
    display: grid;
    width: 100%;
    height: 100vh;
    place-items: center;

    >div {
        text-align: center;
    }

    &__title {
        @include typo('display', 1);

        display: block;
        text-align: center;
        color: #35495e;
    }
}
</style>
