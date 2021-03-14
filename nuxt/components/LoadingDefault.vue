<template>
    <transition name="fade">
        <div v-show="isLoading" class="loading">
            Loading Default...
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Loading',
    computed: {
        ...mapGetters(['isLoading'])
    }
}
</script>

<style lang='scss'>
.loading {
    @include size(100%);

    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    z-index: 99;
}
</style>
