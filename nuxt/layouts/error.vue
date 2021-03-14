<template>
    <div class="page-error">
        {{ error.statusCode + ' ' + error.message }}
    </div>
</template>

<script>
export default {
    name: 'Error',
    props: {
        error: {
            type: Object,
            required: true
        }
    }
}
</script>
