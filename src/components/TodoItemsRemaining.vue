<template>
    <div>{{ remaining }} tasks left</div>
</template>

<script>
export default {
    name: 'todo-remaining',
    props: {
        remaining: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
    div {
        display: inline-block;
    }
</style>
