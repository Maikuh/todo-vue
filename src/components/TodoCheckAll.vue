<template>
    <div>
        <label>
            <input type="checkbox" :checked="!anyRemaining" @change="allChecked"> Check All
        </label>
    </div>
</template>

<script>
export default {
    name: 'todo-check-all',
    computed: {
        anyRemaining() {
            return this.$store.getters.anyRemaining
        }
    },
    methods: {
        allChecked(e) {
            this.$store.dispatch('checkAll', e.target.checked)
        }
    }
}
</script>
