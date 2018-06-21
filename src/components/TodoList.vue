<template>
    <div>
        <input v-model="newTodo" @keyup.enter="addTodo" type="text" class="todo-input" placeholder="What needs to be done?">

        <div v-for="todo in todos" :key="todo.id" class="todo-item">
            <div>
                {{ todo.title }}
            </div>

            <div class="remove-item">
                &times;
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-list',
    data() {
        return {
            newTodo: '',
            todos: [
                {
                    id: 1,
                    title: 'Get outta here',
                    completed: false
                },
                {
                    id: 2,
                    title: 'Kill AT Val Hazak',
                    completed: false
                }
            ]
        }
    },
    computed: {
        nextTodoId() {
            return this.todos.length + 1
        }
    },
    methods: {
        addTodo() {
            // If the new todo is blank, don't add it
            if (this.newTodo.trim().length == 0)
                return 

            // Add the new todo to the todo list
            this.todos.push({
                id: this.nextTodoId,
                title: this.newTodo,
                completed: false
            })

            // Reset the input
            this.newTodo = ''
        }
    }
}
</script>

<style lang="scss">
    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;
        
        &:focus {
            outline: 0;
        }
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;

        &:hover {
            color: black;
        }
    }

</style>
