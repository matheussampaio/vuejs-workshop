<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle"
      type="button"
      @click="open=!open">
      {{selectedGenreName}}
    </button>
    <div :class="{'dropdown-menu':true, 'show':open}">
      <a class="dropdown-item" href="#"
        @click.prevent="onFilterClick()">
        No filter
      </a>
      <a class="dropdown-item" v-for="genre in genres"
        :key="genre.id" href="#"
        @click.prevent="onFilterClick(genre.id)">
        {{genre.name}}
      </a>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      open: false
    }
  },

  computed: {
    genres() {
      return this.$store.state.genres
    },
    selectedGenreName() {
      return this.$store.getters.selectedGenreName || 'Viewing all genres'
    }
  },

  methods: {
    onFilterClick(genreId) {
      this.$store.dispatch('filterMovies', genreId)

      this.open = false
    }
  },

  mounted() {
    this.$store.dispatch('fetchGenres')
  }
}
</script>


<style scoped>
.dropdown {
  margin-top: 20px;
}
</style>
