<template>
    <div :style="globalStyle">
        <Nuxt />
        <Header />
        <LoadingAjax />
        <LoadingDefault />
    </div>
</template>

<script>
import { useStore, useRoute, inject, computed, watch } from '@nuxtjs/composition-api'

export default {
    name: 'DefaultLayout',
    setup (props, context) {
        const store = useStore()
        const route = useRoute()
        const viewportInfo = inject('viewportInfo')

        const globalStyle = computed(() => {
            const style = {
                '--vh': '1vh',
            }
            if (process.browser) {
                style['--vh'] = `${window.innerHeight / viewportInfo.value.vpHeight}vh`
            }
            return style
        })

        watch(route, async (to, from) => {
            await context.parent.$i18n.waitForPendingLocaleChange()
            store.dispatch('WAIT_LOADING')
        }, { immediate: true })

        return {
            viewportInfo,
            globalStyle,
        }
    },
}
</script>

<style lang='scss'>

.button--green {
    display: inline-block;
    padding: 10px 30px;
    text-decoration: none;
    color: #3b8070;
    border: 1px solid #3b8070;
    border-radius: 4px;
}

.button--green:hover {
    color: #ffffff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    padding: 10px 30px;
    text-decoration: none;
    color: #35495e;
    border: 1px solid #35495e;
    border-radius: 4px;
}

.button--grey:hover {
    color: #ffffff;
    background-color: #35495e;
}
</style>
