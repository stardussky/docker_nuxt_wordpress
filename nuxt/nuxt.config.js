import Webpack from 'webpack'
// import path from 'path'
// import fs from 'fs'

export default {
    target: 'server',
    publicRuntimeConfig: {
        APP_TITLE: '',
        APP_TITLE_TEMPLATE: '',
        APP_DESC: '',
        APP_DEFAULT_LANG: '',
        APP_URL: '',
        APP_API: '',
        APP_BACKEND_API: ''
    },
    privateRuntimeConfig: {},
    router: {
        middleware: 'routerMiddleware'
    },
    serverMiddleware: ['@/server/index'],
    server: {
        host: '0.0.0.0'
        // https: {
        //     key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
        //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
        // }
    },
    head: {
        title: process.env.APP_TITLE,
        titleTemplate: `%s | ${process.env.APP_TITLE_TEMPLATE}`,
        htmlAttrs: {
            lang: 'zh'
        },
        meta: [
            { name: 'googlebot', content: 'noindex' }, // TODO: 正式上線後刪除
            { name: 'robots', content: 'noindex' }, // TODO: 正式上線後刪除
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { property: 'og:locale', content: 'en' },
            { property: 'og:type', content: 'website' },
            { hid: 'description', name: 'description', content: process.env.APP_DESC },
            { hid: 'og:title', property: 'og:title', content: process.env.APP_TITLE },
            { hid: 'og:description', property: 'og:description', content: process.env.APP_DESC },
            { hid: 'og:url', property: 'og:url', content: process.env.APP_URL },
            { hid: 'og:site_name', property: 'og:site_name', content: process.env.APP_TITLE },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { hid: 'og:image', property: 'og:image', content: `${process.env.APP_URL}/og_img.jpg` },
            { property: 'og:image:alt', content: process.env.APP_DESC },
            { name: 'twitter:card', content: 'summary_large_image' },
            { hid: 'twitter:description', name: 'twitter:description', content: process.env.APP_DESC },
            { hid: 'twitter:title', name: 'twitter:title', content: process.env.APP_TITLE },
            { hid: 'twitter:image', name: 'twitter:image', content: `${process.env.APP_URL}/og_img.jpg` },
            { hid: 'name', itemprop: 'name', content: process.env.APP_TITLE },
            { itemprop: 'description', content: process.env.APP_DESC },
            { hid: 'image', itemprop: 'image', content: `${process.env.APP_URL}/og_img.jpg` }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    css: [
        '@/style/_main.scss' // global css
    ],
    styleResources: {
        scss: [
            '@/style/mixins/_mixin.scss' // mixin or function only !!!
        ]
    },
    loading: {
        color: '#108774',
        height: '3px'
    },
    plugins: [
        { src: '@/plugins/directives/index', mode: 'client' },
        { src: '@/plugins/prototype/index', mode: 'client' },
        { src: '@/plugins/viewport/index' },
        { src: '@/plugins/svgSupportIE', mode: 'client' },
        { src: '@/plugins/i18n' }
    ],
    components: true,
    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/stylelint-module',
        '@nuxtjs/style-resources'
    ],
    modules: [
        ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
        '@nuxtjs/axios',
        '@nuxtjs/svg-sprite',
        'nuxt-rfg-icon',
        'nuxt-i18n',
        'portal-vue/nuxt',
        'nuxt-webfontloader'
    ],
    axios: {
        browserBaseURL: process.env.APP_API
    },
    svgSprite: {
        input: '~/assets/icons'
    },
    i18n: {
        baseUrl: process.env.APP_URL,
        defaultLocale: process.env.APP_DEFAULT_LANG,
        vueI18n: {
            fallbackLocale: process.env.APP_DEFAULT_LANG
        },
        detectBrowserLanguage: {
            fallbackLocale: process.env.APP_DEFAULT_LANG,
            onlyOnRoot: true
        },
        locales: [
            {
                code: 'zh',
                iso: 'zh_TW'
            },
            {
                code: 'en',
                iso: 'en-US'
            }
        ],
        routesNameSeparator: '_',
        skipSettingLocaleOnNavigate: true,
        seo: false,
        vuex: false
    },
    webfontloader: {
        google: {
            families: ['Noto Sans TC:400, 700']
        }
    },
    build: {
        plugins: [
            new Webpack.ProvidePlugin({})
        ],
        extend (config, { isDev, isClient, isServer }) {
            // webpack loader
        }
    }
}
