import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: [
            {
                id: 1,
                title: 'Get outta here',
                completed: false,
                editing: false
            },
            {
                id: 2,
                title: 'Kill AT Val Hazak',
                completed: false,
                editing: false
            }
        ]
    },
    getters: {
        nextTodoId(state) {
            return state.todos.length + 1
        },
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0
        },
        todosFiltered(state) {
            if(state.filter == 'active')
                return state.todos.filter(todo => !todo.completed)
            else if(state.filter == 'completed')
                return state.todos.filter(todo => todo.completed)
            else
                return state.todos

            return state.todos
        },
        showClearCompletedButton(state) {
            return state.todos.filter(todo => todo.completed).length > 0
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push(todo)
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id == todo.id)

            state.todos.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing
            })
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex(item => item.id == id)
            state.todos.splice(index, 1)
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        updateFilter(state, filter) {
            state.filter = filter
        },
        checkAll(state, checked) {
            state.todos.forEach(todo => todo.completed = checked)
        }
    },
    actions: {
        addTodo(context, todo) {
            setTimeout(() => {
                context.commit('addTodo', todo)
            }, 300);
        },
        updateTodo(context, todo) {
            setTimeout(() => {
                context.commit('updateTodo', todo)
            }, 300);
        },
        deleteTodo(context, id) {
            setTimeout(() => {
                context.commit('deleteTodo', id)
            }, 300);
        },
        clearCompleted(context) {
            setTimeout(() => {
                context.commit('clearCompleted')
            }, 300);
        },
        updateFilter(context, filter) {
            setTimeout(() => {
                context.commit('updateFilter', filter)
            }, 300);
        },
        checkAll(context, checked) {
            setTimeout(() => {
                context.commit('checkAll', checked)
            }, 300);
        }
    }
})