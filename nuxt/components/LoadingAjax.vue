<template>
    <transition name="loading">
        <div
            v-show="loadingConfig.type === 'ajax' && isLoading"
            v-lock="loadingConfig.type === 'ajax' && isLoading"
            class="loading-ajax"
        />
    </transition>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'LoadingAjax',
    computed: {
        ...mapState(['loadingConfig']),
        ...mapGetters(['isLoading']),
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
