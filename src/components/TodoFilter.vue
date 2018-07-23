<template>
    <div>
        <!-- <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">All</button>
        <button :class="{ active: filter == 'active' }" @click="changeFilter('active')">Active</button>
        <button :class="{ active: filter == 'completed' }" @click="changeFilter('completed')">Completed</button> -->

        <p>Filter</p>
        <v-btn-toggle v-model="text">
              <v-btn v-for="item in items" flat color="info" :key="item.filter" @click="changeFilter(item.filter)" :value="item.filter">
                {{item.name}}
              </v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>
export default {
    name: 'todo-filter',
    data() {
        return {
            items: [
                {name: 'All', filter: 'all'},
                {name: 'Active', filter: 'active'},
                {name: 'Completed', filter: 'completed'}
            ],
            text: 'all'
        }
    },
    computed: {
        filter() {
            return this.$store.state.filter
        }
    },
    methods: {
        changeFilter(filter) {
            this.$store.dispatch('updateFilter', filter)
        }
    }
}
</script>

<style>
.v-btn-toggle .v-btn {
    opacity: .8;
}

.v-btn-toggle .v-btn.v-btn--active {
    color: #216dac !important;
}
</style>
