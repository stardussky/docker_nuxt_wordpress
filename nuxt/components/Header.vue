<template>
    <div class="header">
        <div class="header__logo">
            <img src="@/assets/icons/logo.svg" alt="logo" width="60">
        </div>
        <nav class="header__nav">
            <ul class="header__nav-main">
                <li
                    v-for="navItem in nav"
                    :key="navItem.ID"
                >
                    <nuxt-link
                        class="header__nav-link"
                        :to="navItem.url"
                    >
                        {{ navItem.title }}
                    </nuxt-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { useStore, computed } from '@nuxtjs/composition-api'

export default {
    name: 'Header',
    setup (props, context) {
        const store = useStore()

        const locale = computed(() => context.parent.$i18n.locale)
        const globalOptions = computed(() => store.state.globalOptions)
        const nav = computed(() => globalOptions.value[locale.value].main_menu)

        return {
            nav,
        }
    },
}
</script>

<style lang="scss">

.header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    width: 100%;
    background-color: map-get($colors, white);

    &__nav {
        &-main {
            display: flex;
            align-items: center;
        }

        &-link {
            padding: 0 10px;
        }
    }
}
</style>
