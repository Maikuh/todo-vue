<template>
    <!-- <button v-if="showClearCompleted" @click="clearCompleted">Clear Completed</button> -->
    <v-btn v-if="showClearCompleted" @click="clearCompleted" color="red">Clear Completed<v-icon class="ml-1" right>delete</v-icon></v-btn>
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
