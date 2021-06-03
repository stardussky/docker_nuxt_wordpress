<template>
    <transition
        name="loading"
        @afterLeave="loadingDone"
    >
        <div
            v-show="loadingConfig.type === 'ajax' && isLoading"
            v-lock="loadingConfig.type === 'ajax' && isLoading"
            class="loading-ajax"
        />
    </transition>
</template>

<script>
import { useStore, computed } from '@nuxtjs/composition-api'

export default {
    name: 'LoadingAjax',
    setup (props, context) {
        const store = useStore()

        const loadingConfig = computed(() => store.state.loadingConfig)
        const isLoading = computed(() => store.getters.isLoading)

        const loadingDone = () => {
            store.commit('CHANGE_LOADING_TYPE', 'LOADING_TYPE_DEFAULT')
        }

        return {
            loadingConfig,
            isLoading,
            loadingDone,
        }
    },
}
</script>

<style lang='scss'>
.loading-ajax {
    @include size(100%);

    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(map-get($colors, white), 0.9);
    z-index: 99;
    cursor: wait;

    > * {
        pointer-events: none;
    }
}
</style>
