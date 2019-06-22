<template>
  <div>
    <!-- <input v-model="newTodo" @keyup.enter="addTodo" type="text" class="todo-input" placeholder="What needs to be done?"> -->
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
          <v-card class="pa-4">
            <v-text-field v-model="newTodo" @keyup.enter="addTodo" label="What needs to be done?"></v-text-field>

            <transition-group
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <todo-item
                v-for="(todo, index) in todosFiltered"
                :key="index"
                :todo="todo"
                :index="index"
                :checkAll="!anyRemaining"
              ></todo-item>
            </transition-group>
            <div class="extra-container">
              <todo-check-all></todo-check-all>
              <todo-items-remaining></todo-items-remaining>
            </div>

            <div class="extra-container">
              <todo-filter></todo-filter>

              <div>
                <transition name="fade">
                  <todo-clear-completed :key="this.$store.getters.showClearCompletedButton"></todo-clear-completed>
                </transition>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodoFilter from "./TodoFilter";
import TodoClearCompleted from "./TodoClearComp";

export default {
  name: "todo-list",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: "",
      beforeEditCache: ""
    };
  },
  created() {
    this.$store.dispatch("getTodos");
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    }
  },
  methods: {
    addTodo() {
      // If the new todo is blank, don't add it
      if (this.newTodo.trim().length == 0) return;

      // Add the new todo to the todo list
      this.$store.dispatch("addTodo", {
        title: this.newTodo,
        completed: false,
        editing: false
      });

      // Reset the input
      this.newTodo = "";

      console.log(this.todosFiltered);
    }
  }
};
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
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;

  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  // margin-left: 12px;
  min-width: 300px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 0.5em;
  margin-bottom: 0.5em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave {
  opacity: 1;
}
</style>
