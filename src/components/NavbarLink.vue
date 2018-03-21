<template>
  <li :class="{'nav-item': true, 'active': false}">
    <router-link class="nav-link" :to="to">
      {{label}}
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
