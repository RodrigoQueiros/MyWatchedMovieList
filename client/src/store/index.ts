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
  addMinutesToTime
} from "../utils/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Home page
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
      console.log(response);
      response.map((movie: MovieModel) => {
        movie.poster_path = correctPosterPath(response.poster_path);
        console.log(2);
        console.log(movie.poster_path);
        movie.overview = reduceOverviewLength(response.overview);
        movie.runtime = addMinutesToTime(response.runtime);
      });

      state.bannerMovies = response;
      console.log(3);
      console.log(state.bannerMovies);
    },
    // Categories
    GET_CATEGORIES(state, response) {
      response.data.genres.forEach((genre: CategoriesModel, i: number) => {
        genre.img = state.categoriesImages[i].name;
        genre.color = state.categoriesImages[i].color;
        state.genres.push(genre);
      });
    },
    // RandomMovie
    GET_RANDOMMOVIE(state, response) {
      // Random between 0 and 19 (items in one page)
      const num2 = Math.floor(Math.random() * 20);
      response.data.results[num2].poster_path = correctPosterPath(
        response.data.results[num2].poster_path
      );
      state.randomMovie = response.data.results[num2];
      console.log(state.randomMovie);
    },

    // Watch list
    GET_WATCHLIST(state, response) {
      state.watchList = response;
    }
  },
  actions: {
    // Home
    async getBannerMovies({ commit, state }) {
      console.log(state.bannerIds);
      let tempVar: MovieModel[] = [];
      state.bannerIds.forEach(async (movie: BannerModel) => {
        await get(
          "/movie/" +
            movie.id +
            "?api_key=" +
            process.env.VUE_APP_API_KEY +
            "&language=en-US"
        ).then(result => {
          result.data.src = movie.path;
          tempVar.push(result.data);
        });
      });
      console.log(1);
      console.log(tempVar);
      commit("GET_BANNERMOVIES", tempVar);
    },
    // Categories
    async getCategories({ commit }) {
      await get(
        "/genre/movie/list?api_key=" +
          process.env.VUE_APP_API_KEY +
          "&language=en-US"
      ).then(result => {
        commit("GET_CATEGORIES", result);
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
    }
  },
  modules: {}
});
