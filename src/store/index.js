import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { resolve } from 'url';

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.defaults.headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
}

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
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
        },
        loggedIn(state) {
            return state.token !== null
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
        },
        getToken(state, token) {
            state.token = token
            axios.defaults.headers = {
                Authorization: `Bearer ${state.token}`
            }
        },
        logout(state) {
            state.token = null
        }
    },
    actions: {
        async getTodos(context) {
            try {
                const res = await axios.get('/todos')
                console.log(res.data);
                
                context.commit('getTodos', res.data)    
            } catch (err) {
                console.log(err.response);
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
        },
        getToken({commit}, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await axios.post('/users/login', {
                        username: credentials.username,
                        password: credentials.password
                    })
    
                    const token = res.data.token
                    
                    localStorage.setItem('access_token', token)
                    commit('getToken', token)
                    resolve(res)
                } catch (err) {
                    console.log(err.response);
                    reject(err.response)
                }
            })
        },
        logout(context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    localStorage.removeItem('access_token')
                    context.commit('logout')
                    resolve()
                })
            }            
        }
    }
})