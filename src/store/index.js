import Vue from 'vue'
import Vuex from 'vuex'
import MovieService from '../services/MovieService'

Vue.use(Vuex)

const store = {
  state: {
    movies: [],
    genres: [],
    savedMovies: [],
    selectedGenre: null,
    loading: false,
    currentPage: 1,
    totalPages: 0
  },

  actions: {
    async fetchMovies(context, page = 1) {
      context.commit('setLoading', true)

      const moviesData = await MovieService.getMovies({
        page,
        genre: context.state.selectedGenre
      })

      context.commit('setMovies', moviesData.data)
      context.commit('setLoading', false)
    },
    async fetchGenres(context) {
      const genreData = await MovieService.getGenres()
      context.commit('setGenres', genreData.data)
    },
    filterMovies(context, genreId) {
      context.commit('setGenre', genreId)
      context.dispatch('fetchMovies')
    },
    fetchPage(context, page) {
      context.dispatch('fetchMovies', page)
    },
    saveMovie(context, movie) {
      context.commit('pushMovie', movie)
      context.commit('persistMovies')
    },
    removeMovie(context, movie) {
      context.commit('popMovie', movie)
      context.commit('persistMovies')
    },
    async fetchSavedMovies(context) {
      const savedMoviesJson = localStorage.getItem('savedMovies')
      const savedMovies = savedMoviesJson ? JSON.parse(savedMoviesJson) : []

      context.commit('setSavedMovies', savedMovies)
    },
  },

  mutations: {
    setMovies(state, moviesData) {
      state.currentPage = moviesData.page
      state.totalPages = moviesData.total_pages
      state.movies = moviesData.results
    },
    setGenres(state, genresData) {
      state.genres = genresData.genres
    },
    setGenre(state, genreId) {
      state.selectedGenre = genreId
    },
    setLoading(state, value) {
      state.loading = value
    },
    pushMovie(state, movie) {
      state.savedMovies.push(movie)
    },
    popMovie(state, movie) {
      state.savedMovies = state.savedMovies.filter(m => m.id !== movie.id)
    },
    persistMovies(state) {
      localStorage.setItem('savedMovies', JSON.stringify(state.savedMovies))
    },
    setSavedMovies(state, movies) {
      state.savedMovies = movies
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
    },
    selectedGenreName(state) {
      const genre = state.genres.find(genre => genre.id === state.selectedGenre)

      return genre ? genre.name : null
    }
  }
}

export default new Vuex.Store(store)
