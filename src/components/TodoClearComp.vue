<template>
    <button v-if="showClearCompleted" @click="clearCompleted">Clear Completed</button>
</template>

<script>
export default {
    name: 'todo-clear-completed',
    computed: {
        showClearCompleted() {
            return this.$store.getters.showClearCompletedButton
        }
    },
    methods: {
        clearCompleted() {
            this.$store.dispatch('clearCompleted')
        }
    }
}
</script>
