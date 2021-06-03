<template>
    <div class="page-end">
        <div class="container">
            <div>
                <Logo />
                <h1 class="page-end__title">
                    {{ localeData.message }}
                </h1>
                <div class="links">
                    <nuxt-link class="button--grey" :to="localePath('/', $i18n.locale)">
                        BACK
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore, onMounted } from '@nuxtjs/composition-api'
import functions from '@/compositions/functions'

export default {
    name: 'PageEnd',
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.route = {
                params: { pathMatch: to.params.pathMatch },
                query: to.query,
            }
        })
    },
    meta: {
        loading: true,
    },
    setup () {
        const store = useStore()
        const { loadImage } = functions()

        onMounted(() => {
            store.dispatch('ADD_LOADING_STACK', loadImage())
        })
    },
    data () {
        return {
            route: null,
        }
    },
    computed: {
        localeData () {
            return this.$t(this.$translateUrl('all', this.route || this.$route).routeName)
        },
    },
}
</script>

<style lang='scss'>

.page-end {
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
    }

    &__title {
        @include typo('display', 1);

        margin-bottom: 20px;
        color: #35495e;
    }
}
</style>
