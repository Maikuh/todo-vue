<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <label>
                <input type="checkbox" v-model="completed" @change="doneEdit">
                <span></span>
            </label>
            <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed: completed }">{{ title }}</div>
            <input v-else v-model="title" class="todo-item-edit" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus type="text">
        </div>

        <div class="remove-item" @click="removeTodo()">
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
                title: this.todo.title,
                completed: this.todo.completed,
                editing: this.todo.editing,
                beforeEditCache: '',
            }
        },
        watch: {
            checkAll() {
                // Set the status to true if Check All is true
                // Else, set the status to the todo's status (i.e. false)
                this.completed = this.checkAll ? true : this.todo.completed
            },
            todo() {
                // Watch for prop change and set local vars to prop's
                this.title = this.todo.title
                this.completed = this.todo.completed
                this.editing = this.todo.editing
                this.beforeEditCache = ''
            }
        },
        methods: {
            removeTodo() {
                this.$store.dispatch('deleteTodo', this.todo._id)
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
                    _id: this.todo._id,
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

<style lang="scss" scoped>
    input[type="checkbox"] {
        display: none;

        + span::before {
            content: 'check_box_outline_blank';
            font-family: 'Material Icons';
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 2;
            width: 1em;
            color: gray;
            display: inline-block;
            animation: popOut .2s ease-in-out;
        }

        &:checked + span::before {
            content: "check_box";
            color: rgb(19, 121, 255);
            animation: popIn .13s ease-in-out;
        }
    }

    @keyframes popIn {
        0% {transform: scale(0)}
        90% {transform: scale(1.2)}
        100% {transform: scale(1)}
    }

    @keyframes popOut {
        0% {
            transform: scale(1); 
            content: "check_box";
            color: rgb(19, 121, 255);
        }
        90% {
            transform: scale(1.2);
            content: "check_box";
            color: rgb(19, 121, 255);
        }
        100% {
            transform: scale(0);
            opacity: .1;
        }
    }
</style>
