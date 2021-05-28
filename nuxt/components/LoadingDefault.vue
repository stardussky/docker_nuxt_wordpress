<template>
    <transition name="loading">
        <div
            v-show="loadingConfig.type === 'default' && isLoading"
            v-lock="loadingConfig.type === 'default' && isLoading"
            class="loading"
        />
    </transition>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'Loading',
    computed: {
        ...mapState(['loadingConfig']),
        ...mapGetters(['isLoading']),
    },
}
</script>

<style lang='scss'>
.loading {
    @include size(100%);

    position: fixed;
    top: 0;
    left: 0;
    background-color: map-get($colors, black);
    z-index: 99;
    cursor: wait;

    > * {
        pointer-events: none;
    }
}
</style>
