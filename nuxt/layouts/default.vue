<template>
    <div :style="globalStyle">
        <Nuxt />
        <LoadingDefault />
    </div>
</template>

<script>
import { viewport } from '@/plugins/viewport/index'
import ImagesLoaded from 'imagesloaded'
import { mapActions } from 'vuex'

export default {
    name: 'DefaultLayout',
    computed: {
        ...viewport.vpHeight,
        globalStyle () {
            const style = {
                '--vh': '1vh'
            }
            if (process.browser) {
                style['--vh'] = `${window.innerHeight / this.vpHeight}vh`
            }
            return style
        }
    },
    mounted () {
        this.START_LOADING((done) => {
            /* eslint-disable no-unused-vars */
            const loader = new ImagesLoaded('#__nuxt', { background: '[data-background]' }, (instance) => {
                done(-2)
            })
        })
    },
    beforeDestroy () {
        this.$viewport.destroy()
    },
    methods: {
        ...mapActions(['START_LOADING'])
    }
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
    margin-left: 15px;
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
