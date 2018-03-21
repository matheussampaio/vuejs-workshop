<template>
  <div>
    <div class="col">
      <h1>Hello {{ name || 'stranger' }}!</h1>
      <input v-model="name" type="text">
    </div>

    <hr>

    <add-todo @addTask="addTask" />

    <br>

    <div class="container">
      <template v-if="pendingTasks.length">
        <h3>Pending</h3>
          <todo-list @toggle="toggle" :tasks="pendingTasks" />
      </template>

      <br>

      <template v-if="completedTasks.length">
        <h3>Completed</h3>
        <todo-list @toggle="toggle" :tasks="completedTasks" />
      </template>
    </div>
  </div>
</template>

<script>
import TodoList from './TodoList'
import AddTodo from './AddTodo'

export default {
  components: {
    AddTodo,
    TodoList
  },
  data() {
    return {
      name: 'Matheus',
      tasks: [
        { description: 'learn vuejs', isDone: Math.random() > 0.5 ? false : true },
        { description: '???', isDone: Math.random() > 0.5 ? false : true },
        { description: 'conquer the world!', isDone: Math.random() > 0.5 ? false : true }
      ]
    }
  },
  methods: {
    toggle(task) {
      task.isDone = !task.isDone
    },
    addTask(newTask) {
      if (!newTask) {
        return
      }

      this.tasks.push({ description: newTask, isDone: false })
    }
  },
  computed: {
    pendingTasks() {
      return this.tasks.filter(task => !task.isDone)
    },
    completedTasks() {
      return this.tasks.filter(tasks => tasks.isDone)
    }
  }
}
</script>

<style>

</style>
