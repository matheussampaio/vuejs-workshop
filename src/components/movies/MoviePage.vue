<template>
  <div>

    <div class="container">
      <h1>My movies backlog</h1>
    </div>

    <movie-nav/>

    <div class="container">

      <movie-filter v-if="!isBacklog"/>

      <div class="row movie-container" :class="{'loading': loading}">

        <div v-for="movie in currentMovies"
          :key="movie.index"
          class="col-xs-12 col-sm-6 col-lg-3">
          <movie-card v-bind="movie"/>
        </div>

      </div>

      <pagination v-if="!isBacklog"/>

    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard'
import MovieNav from './MovieNav'
import Pagination from './Pagination'
import MovieFilter from './MovieFilter'
import isBacklogMixin from '../../mixins/isBacklogMixin'

export default {
  ...isBacklogMixin,

  components: {
    MovieCard,
    MovieNav,
    Pagination,
    MovieFilter
  },

computed: {
    movies() {
      return this.$store.getters.moviesCards
    },
    loading() {
      return this.$store.state.loading
    },
    isBacklog() {
      return this.$route.path === '/movies/backlog'
    },
    currentMovies() {
      return this.isBacklog ? this.$store.state.savedMovies : this.movies
    }
  },
  mounted() {
    this.$store.dispatch('fetchMovies')
    this.$store.dispatch('fetchSavedMovies')
  }
}
</script>

<style scoped>
.movie-container {
  margin-top: 10px;
  margin-bottom: 10px;
  transition: 0.3s opacity;
}

.loading{
  opacity: 0.2;
}
</style>
