import Vue from "vue";
import Vuex from "vuex";
import {
  CategoriesModel,
  WatchModel,
  MovieModel,
  BannerModel
} from "./models/models";
import {
  get,
  correctPosterPath,
  reduceOverviewLength,
  addMinutesToTime,
  reduceTitleLength
} from "../utils/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Home page
    popularMovies: Array<MovieModel>(),
    topMovies: Array<MovieModel>(),
    upcomingMovies: Array<MovieModel>(),
    bannerIds: [
      {
        id: "337401",
        path:
          "https://www.denofgeek.com/wp-content/uploads/2020/09/boycott-mulan-hero-image-2.png?fit=2000%2C500&resize=2000%2C500"
      },
      {
        id: "299536",
        path: "https://image.ibb.co/fvCZ3G/EMH1.jpg"
      }
    ],
    bannerMovies: Array<MovieModel>(),
    //CatalogMovies
    catalogMovies: Array<MovieModel>(),
    totalPages: 0,
    // Details page
    detailsMovie: {},
    recommendedMoviesbyGenre: Array<MovieModel>(),
    recommendedMovies: Array<MovieModel>(),
    // Watch list
    watchList: Array<WatchModel>(),
    // Random Movie
    randomMovie: {},
    // Categories
    genres: Array<CategoriesModel>(),
    categoriesImages: [
      {
        name: "action.jpg",
        color: "rgba(200, 100, 0, 0.6)"
      },
      {
        name: "adventure.jpg",
        color: "rgba(50, 50, 150, 0.6)"
      },
      {
        name: "animation.jpg",
        color: "rgba(150, 150, 20, 0.6)"
      },
      {
        name: "comedy.jpg",
        color: "rgba(50, 200, 100, 0.6)"
      },
      {
        name: "crime.jpg",
        color: "rgba(100, 0, 100, 0.6)"
      },
      {
        name: "documentary.jpg",
        color: "rgba(100, 30, 10, 0.6)"
      },
      {
        name: "drama.jpg",
        color: "rgba(200, 150, 200, 0.6)"
      },
      {
        name: "family.jpg",
        color: "rgba(70, 155, 170, 0.6)"
      },
      {
        name: "fantasy.jpg",
        color: "rgba(200, 50, 180, 0.6)"
      },
      {
        name: "history.jpg",
        color: "rgba(120, 100, 60, 0.6)"
      },
      {
        name: "horror.jpg",
        color: "rgba(80, 5, 20, 0.6)"
      },
      {
        name: "music.jpg",
        color: "rgba(150, 150, 100, 0.6)"
      },
      {
        name: "mystery.jpg",
        color: "rgba(30, 80, 40, 0.6)"
      },
      {
        name: "romance.jpg",
        color: "rgba(200, 20, 20, 0.6)"
      },
      {
        name: "science.jpg",
        color: "rgba(80, 5, 220, 0.6)"
      },
      {
        name: "tvmovie.jpg",
        color: "rgba(220, 125, 70, 0.6)"
      },
      {
        name: "thriller.jpg",
        color: "rgba(70, 20, 20, 0.6)"
      },
      {
        name: "war.jpg",
        color: "rgba(130, 105, 100, 0.6)"
      },
      {
        name: "western.jpg",
        color: "rgba(200, 150, 50, 0.6)"
      }
    ]
  },
  mutations: {
    // Home
    GET_BANNERMOVIES(state, response) {
      console.log("mutation");
      state.bannerMovies = response;
    },
    GET_POPULARMOVIES(state, response) {
      response.map((movie: MovieModel) => {
        movie.poster_path = correctPosterPath(movie.poster_path);
        movie.title = reduceTitleLength(movie.title);
      });
      state.popularMovies = response;
    },
    GET_TOPMOVIES(state, response) {
      response.map((movie: MovieModel) => {
        movie.poster_path = correctPosterPath(movie.poster_path);
        movie.title = reduceTitleLength(movie.title);
      });
      state.topMovies = response;
    },
    GET_UPCOMINGMOVIES(state, response) {
      response.map((movie: MovieModel) => {
        movie.poster_path = correctPosterPath(movie.poster_path);
        movie.title = reduceTitleLength(movie.title);
      });
      state.upcomingMovies = response;
    },
    // Catalog
    GET_ALLGENRES(state, response) {
      state.genres = response;
    },
    GET_MOVIESBYNAME(state, response) {
      response.results.forEach((movie: MovieModel) => {
        movie.poster_path = correctPosterPath(movie.poster_path);
        movie.title = reduceTitleLength(movie.title);
        movie.overview = reduceOverviewLength(movie.overview);
      });
      state.totalPages = response.total_pages;
      state.catalogMovies = response.results;
    },
    GET_MOVIESADVANCEDSEARCH(state, response) {
      console.log(3);
      console.log(response);
      response.results.forEach((movie: MovieModel) => {
        console.log(4);
        movie.poster_path = correctPosterPath(movie.poster_path);
        movie.title = reduceTitleLength(movie.title);
        movie.overview = reduceOverviewLength(movie.overview);
      });
      console.log(5);
      console.log(response);
      state.totalPages = response.total_pages;
      state.catalogMovies = response.results;
    },

    // Details page
    GET_MOVIEDETAILSBYID(state, response) {
      state.detailsMovie = response;
    },
    GET_MOVIESBYGENREID(state, response) {
      response.map((genre: MovieModel) => {
        genre.poster_path = correctPosterPath(genre.poster_path);
        genre.title = reduceTitleLength(genre.title);
      });

      state.recommendedMoviesbyGenre = response;
    },
    GET_RECOMMENDEDMOVIEBYID(state, response) {
      response.map((movie: MovieModel) => {
        movie.poster_path = correctPosterPath(movie.poster_path);
        movie.title = reduceTitleLength(movie.title);
      });

      state.recommendedMovies = response;
    },
    // Categories
    GET_CATEGORIES(state, response) {
      response.forEach((genre: CategoriesModel, i: number) => {
        genre.img = state.categoriesImages[i].name;
        genre.color = state.categoriesImages[i].color;
      });
      state.genres = response;
    },
    // RandomMovie
    GET_RANDOMMOVIE(state, response) {
      // Random between 0 and 19 (items in one page)
      const num2 = Math.floor(Math.random() * 20);
      response.data.results[num2].poster_path = correctPosterPath(
        response.data.results[num2].poster_path
      );
      state.randomMovie = response.data.results[num2];
    },

    // Watch list
    GET_WATCHLIST(state, response) {
      state.watchList = response;
    },
    ADD_TOLIST(state, response) {
      localStorage.setItem("watch-list", JSON.stringify(response));
      state.watchList = response;
    },
    REMOVE_FROMLIST(state, response) {
      localStorage.setItem("watch-list", JSON.stringify(response));
      state.watchList = response;
    }
  },
  actions: {
    // Home
    async getBannerMovies({ commit, state }) {
      let tempVar: MovieModel[] = [];
      await state.bannerIds.forEach(async (movie: BannerModel, i: number) => {
        await get(
          "/movie/" +
            movie.id +
            "?api_key=" +
            process.env.VUE_APP_API_KEY +
            "&language=en-US"
        ).then(result => {
          result.data.src = movie.path;
          result.data.poster_path = correctPosterPath(result.data.poster_path);
          result.data.overview = reduceOverviewLength(result.data.overview);
          result.data.runtime = addMinutesToTime(result.data.runtime);
          tempVar.push(result.data);
          if (i + 1 == state.bannerIds.length) {
            commit("GET_BANNERMOVIES", tempVar);
          }
        });
      });
    },
    async getPopularMovies({ commit }) {
      await get(
        "/movie/popular" +
          "?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US&page=1"
      ).then(result => {
        result = result.data.results.slice(0, 10);
        commit("GET_POPULARMOVIES", result);
      });
    },
    async getTopMovies({ commit }) {
      await get(
        "/movie/top_rated" +
          "?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US&page=1"
      ).then(result => {
        result = result.data.results.slice(0, 10);
        commit("GET_TOPMOVIES", result);
      });
    },
    async getUpcomingMovies({ commit }) {
      await get(
        "/movie/upcoming" +
          "?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US&page=1"
      ).then(result => {
        result = result.data.results.slice(0, 10);
        commit("GET_UPCOMINGMOVIES", result);
      });
    },
    // Catalog
    async getMoviesAdvancedSearch({ commit }, filters) {
      await get(
        "/discover/movie?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1" +
          filters
      ).then(result => {
        console.log(2);
        console.log(result);
        commit("GET_MOVIESADVANCEDSEARCH", result.data);
      });
    },
    async getMoviesByName({ commit }, name) {
      await get(
        "/search/movie?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US&include_adult=false" +
          name
      ).then(result => {
        commit("GET_MOVIESBYNAME", result.data);
      });
    },
    async getAllGenres({ commit }) {
      await get(
        "/genre/movie/list?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US"
      ).then(result => {
        commit("GET_ALLGENRES", result.data.genres);
      });
    },
    // Details page
    async getMovieDetailsById({ commit }, id: string) {
      console.log(id);
      await get(
        "/movie/" +
          id +
          "?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US"
      ).then(result => {
        result.data.poster_path = correctPosterPath(result.data.poster_path);
        result.data.runtime = addMinutesToTime(result.data.runtime);
        result.data.randomGenre =
          result.data.genres[
            Math.floor(Math.random() * result.data.genres.length)
          ];
        commit("GET_MOVIEDETAILSBYID", result.data);
      });
    },
    async getMoviesByGenreId({ commit }, id: string) {
      await get(
        "/discover/movie?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
          id
      ).then(result => {
        commit("GET_MOVIESBYGENREID", result.data.results.slice(0, 3));
      });
    },
    async getRecommendedMovieById({ commit }, id: string) {
      await get(
        "/movie/" +
          id +
          "/recommendations?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US"
      ).then(result => {
        commit("GET_RECOMMENDEDMOVIEBYID", result.data.results.slice(0, 3));
      });
    },
    // Categories
    async getCategories({ commit }) {
      await get(
        "/genre/movie/list?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US"
      ).then(result => {
        commit("GET_CATEGORIES", result.data.genres);
      });
    },
    // Random movie
    async getRandomMovie({ commit }) {
      // Random between 1 and 500 (pages)
      const num1 = Math.floor(Math.random() * 499) + 1;

      await get(
        "/movie/popular" +
          "?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US&page=" +
          num1.toString()
      ).then(result => {
        commit("GET_RANDOMMOVIE", result);
      });
    },
    // Watch list
    getWatchList({ commit }) {
      let local = localStorage.getItem("watch-list");
      if (local) {
        let tempVar = JSON.parse(local);
        commit("GET_WATCHLIST", tempVar);
      } else {
        commit("GET_WATCHLIST", []);
      }
    },
    addToList({ commit }, movie) {
      let tempMovie: WatchModel = {
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        id: movie.id,
        watchState: "completed"
      };

      let local = localStorage.getItem("watch-list");
      if (local) {
        let obj = JSON.parse(local);
        obj.push(tempMovie);
        commit("ADD_TOLIST", obj);
      } else {
        let temp = [];
        temp.push(tempMovie);
        commit("ADD_TOLIST", temp);
      }
    },
    removeFromList({ commit }, movie) {
      let local = localStorage.getItem("watch-list");
      if (local) {
        let obj = JSON.parse(local);

        obj.forEach((element: WatchModel, i: number) => {
          if (element.id == movie.id) {
            obj.splice(i, 1);
          }
        });
        commit("REMOVE_FROMLIST", obj);
      }
    }
  },
  modules: {}
});
