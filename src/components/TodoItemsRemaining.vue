<template>
    <div>{{ remaining }} tasks left</div>
</template>

<script>
export default {
    name: 'todo-remaining',
    computed: {
        remaining() {
            return this.$store.getters.remaining
        }
    }
}
</script>

<style scoped>
    div {
        display: inline-block;
    }
</style>
