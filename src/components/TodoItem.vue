<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit">
            <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed: completed }">{{ title }}</div>
            <input v-else v-model="title" class="todo-item-edit" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus type="text">
        </div>

        <div class="remove-item" @click="removeTodo(todo.id)">
            &times;
        </div>
    </div>
</template>

<script>
    export default {
        name: 'todo-item',
        props: {
            todo: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
            checkAll: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                id: this.todo.id,
                title: this.todo.title,
                completed: this.todo.completed,
                editing: this.todo.editing,
                beforeEditCache: ''
            }
        },
        watch: {
            checkAll() {
                // Set the status to true if Check All is true
                // Else, set the status to the todo's status (i.e. false)
                this.completed = this.checkAll ? true : this.todo.completed
            }
        },
        methods: {
            removeTodo(id) {
                this.$store.dispatch('deleteTodo', id)
            },
            editTodo() {
                this.beforeEditCache = this.title
                this.editing = true
            },
            doneEdit() {
                if (this.title.trim() == '')
                    this.title = this.beforeEditCache
                
                this.editing = false

                this.$store.dispatch('updateTodo', {
                    id: this.id,
                    title: this.title,
                    completed: this.completed,
                    editing: this.editing
                })

            },
            cancelEdit() {
                this.title = this.beforeEditCache
                this.editing = false
            }
        },
        directives: {
            focus: {
                inserted: function(el) {
                    el.focus()
                }
            }
        }
    }
</script>
