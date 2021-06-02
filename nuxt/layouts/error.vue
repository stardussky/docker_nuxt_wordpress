<template>
    <div class="page-error">
        <div class="container">
            <div>
                <p class="page-error__title">
                    {{ error.statusCode + ' ' + error.message }}
                </p>
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
export default {
    name: 'Error',
    props: {
        error: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang='scss'>

.page-error {
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
