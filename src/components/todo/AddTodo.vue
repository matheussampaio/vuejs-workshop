<template>
  <form class="container" @submit.prevent="addTask">
    <div class="input-group">
      <input type="text" class="form-control" v-model="newTask">
      <div class="input-group-btn">
        <button class="btn btn-warning" :disabled="!newTask">Add</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newTask: ''
    }
  },
  methods: {
    addTask() {
      this.$emit('addTask', this.newTask)

      this.newTask = ''
    }
  }
}
</script>

<style>

</style>
