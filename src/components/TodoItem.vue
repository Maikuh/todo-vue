<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit">
            <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed: completed }">{{ title }}</div>
            <input v-else v-model="title" class="todo-item-edit" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus type="text">
        </div>

        <div class="remove-item" @click="removeTodo">
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
                this.completed = this.checkAll ? true : false
            }
        },
        methods: {
            removeTodo() {
                this.$emit('removedTodo', this.index)
            },
            editTodo() {
                this.beforeEditCache = this.title
                this.editing = true
            },
            doneEdit() {
                if (this.title.trim() == '')
                    this.title = this.beforeEditCache
                
                this.editing = false

                this.$emit('doneEditing', {
                    index: this.index,
                    todo: {
                        id: this.id,
                        title: this.title,
                        completed: this.completed,
                        editing: this.editing
                    }
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
