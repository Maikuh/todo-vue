import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:3000/api'

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: []
    },
    getters: {
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
        },
        showClearCompletedButton(state) {
            return state.todos.filter(todo => todo.completed).length > 0
        }
    },
    mutations: {
        getTodos(state, todos) {
            state.todos = todos
        },
        addTodo(state, todo) {
            state.todos.push(todo)
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item._id == todo._id)

            state.todos.splice(index, 1, {
                _id: todo._id,
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
        async getTodos(context) {
            try {
                const res = await axios.get('/todos')
                context.commit('getTodos', res.data)    
            } catch (err) {
                console.log(err);
            }
        },
        async addTodo({commit}, todo) {
            try {
                const res = await axios.post('/todos', todo)
                commit('addTodo', res.data)
            } catch (err) {
                console.log(err);
            }
        },
        async updateTodo({commit}, todo) {
            try {
                const res = await axios.patch(`/todos/${todo._id}`, todo)
                commit('updateTodo', res.data)
            } catch (err) {
                console.log(err);
            }
        },
        async deleteTodo({commit}, id) {
            try {
                const res = await axios.delete(`/todos/${id}`)
                commit('deleteTodo', id)
            } catch (err) {
                console.log(err);
            }
        },
        async clearCompleted({commit}) {
            try {
                const res = await axios.delete('/todos')
                commit('clearCompleted')
            } catch (err) {
                console.log(err);
            }
        },
        updateFilter({commit}, filter) {
            commit('updateFilter', filter)
        },
        async checkAll({commit}, checked) {
            try {
                const res = await axios.patch('/todos', {
                    completed: checked
                })
                commit('checkAll', checked)
            } catch (err) {
                console.log(err);
            }
        }
    }
})