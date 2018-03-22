import Vue from 'vue'
import Vuex from 'vuex'
import MovieService from '../services/MovieService'

Vue.use(Vuex)

const store = {
  state: {
    hello: 'world',
    movies: [],
    genres: []
  },

  actions: {
    async fetchMovies(context) {
      const moviesData = await MovieService.getMovies({
        page: 1,
        genre: null
      })

      context.commit('setMovies', moviesData.data)
    },
    async fetchGenres(context) {
      const genreData = await MovieService.getGenres()

      context.commit('setGenres', genreData.data)
    }
  },

  mutations: {
    setMovies(state, moviesData) {
      state.movies = moviesData.results
    },
    setGenres(state, genresData) {
      state.genres = genresData.genres
    }
  },

  getters: {
    moviesCards(state) {
      const imageBasePath = 'http://image.tmdb.org/t/p/w370_and_h556_bestv2'

      return state.movies.map(movie => ({
        id: movie.id,
        image: `${imageBasePath}${movie.poster_path}`,
        title: movie.title,
        description: movie.overview,
        voteAverage: movie.vote_average
      }))
    }
  }
}

export default new Vuex.Store(store)
