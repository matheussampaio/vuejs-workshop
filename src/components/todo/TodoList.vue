<template>
  <ul class="list-group">
    <li v-for="(task, index) in tasks" :key="index" class="list-group-item">
      {{ task.description }} - {{ task.isDone ? 'done' : 'pending' }}
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
    toggle(item) {
      this.$emit('toggle', item)
    }
  }
}
</script>
