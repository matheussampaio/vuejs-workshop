<template>
  <ul class="list-group">
    <li v-for="(task, index) in tasks" :key="index" class="list-group-item">
      <span>
        {{ task.description }} - {{ task.isDone ? 'done' : 'pending' }}
      </span>
      <button class="btn btn-sm btn-danger float-right"
        @click="remove(task)">
        remove
      </button>
      <button class="btn btn-sm btn-primary float-right"
        @click="toggle(task)">
        toggle
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      default: []
    }
  },
  methods: {
    toggle(task) {
      this.$emit('toggle', task)
    },
    remove(task) {
      this.$emit('remove', task)
    }
  }
}
</script>
