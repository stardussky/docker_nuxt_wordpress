<template>
    <transition
        name="loading"
        @afterLeave="loadingDone"
    >
        <div
            v-show="loadingConfig.type === 'default' && isLoading"
            v-lock="loadingConfig.type === 'default' && isLoading"
            class="loading-default"
        >
            <div class="loading-default__main" />
            <Portal-target name="loading-default" />
        </div>
    </transition>
</template>

<script>
import { useStore, computed } from '@nuxtjs/composition-api'

export default {
    name: 'LoadingDefault',
    setup (props, context) {
        const store = useStore()

        const loadingConfig = computed(() => store.state.loadingConfig)
        const isLoading = computed(() => store.getters.isLoading)

        const loadingDone = () => {
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
.loading-default {
    @include size(100%);

    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;

    > * {
        pointer-events: none;
    }

    &__main {
        @include size(100%);

        position: fixed;
        top: 0;
        left: 0;
        background-color: map-get($colors, black);
    }
}
</style>
