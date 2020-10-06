<template>
  <div class="home">
    <!-- Hero Trending -->

    <div
      class="hero"
      v-for="(movie,i) in movieTrending"
      :key="movie.id"
      v-show="movieTrendingShow==i"
      @click="goToMovie(movie.id)"
      @mouseover="pauseInterval = true"
      @mouseleave="pauseInterval = false"
    >
      <div class="hero-gradient">
        <img class="hero-wallpaper" :src="movie.src" alt />
      </div>

      <span class="hero-content">
        <h2 class="hero-trending-header">Trending</h2>
        <transition name="fade" mode="out-in">
          <div class="flex-container" v-show="movieTrendingShow==i">
            <img :src="movie.poster_path" alt class="hero-trending-image" />
            <div class="hero-trending-info">
              <h1 class="hero-trending-title">{{movie.original_title}}</h1>
              <p class="hero-trending-text">{{movie.overview}}</p>
            </div>
            <div class="hero-trending-more-info">
              <p class="hero-trending-extra-info">rating: {{movie.vote_average}} / 10</p>
              <p class="hero-trending-extra-info">duration: {{movie.runtime}}</p>
            </div>
          </div>
        </transition>
      </span>
    </div>
    <div class="movie-cards">
      <!-- Most popular -->
      <h3>Most popular</h3>
      <hooper :settings="hooperMovieCard">
        <slide class="movie-card" v-for="movie in popularMovies" :key="movie.id">
          <div @click="goToMovie(movie.id)">
            <div class="movie-card-info">
              <img class="movie-card-image" :src="movie.poster_path" alt />
              <div class="overlay">
                <p class="text-overlay">rating: {{movie.vote_average}}</p>
                <p class="text-overlay">{{movie.release_date}}</p>
              </div>
            </div>
            <h2 class="movie-card-title">{{movie.title}}</h2>
          </div>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>

      <!-- Top rated -->
      <h3>Top rated</h3>
      <hooper :settings="hooperMovieCard">
        <slide class="movie-card" v-for="movie in topMovies" :key="movie.id">
          <div @click="goToMovie(movie.id)">
            <div class="movie-card-info">
              <img class="movie-card-image" :src="movie.poster_path" alt />
              <div class="overlay">
                <p class="text-overlay">rating: {{movie.vote_average}}</p>
                <p class="text-overlay">{{movie.release_date}}</p>
              </div>
            </div>
            <h2 class="movie-card-title">{{movie.title}}</h2>
          </div>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
    </div>
  </div>
</template>

<script lang="ts">
//Axios
import {
  getMovieDetailsById,
  getPopularMovies,
  getTopMovies
} from "../API/apiMovie";
//TS
import { Component, Vue } from "vue-property-decorator";
//Hooper (Swiper)
import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from "hooper";
import "hooper/dist/hooper.css";

interface hooper {
  itemsToShow: number;
  itemsToSlide: number;
  infiniteScroll: boolean;
  wheelControl: boolean;
  vertical: boolean;
  autoPlay: boolean;
  playSpeed: number;
  mouseDrag: boolean;
}

type movieType = {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
};

@Component({
  components: {
    // VueSlickCarousel
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation
  }
})
export default class Home extends Vue {
  private pauseInterval: boolean = false;
  private movieTrendingShow: number = 0;
  private movieTrending: movieType[] = [];
  private popularMovies: movieType[] = [];
  private topMovies: movieType[] = [];
  private hooperMovieCard: hooper = {
    itemsToShow: 5,
    itemsToSlide: 5,
    infiniteScroll: true,
    wheelControl: false,
    vertical: false,
    autoPlay: false,
    playSpeed: 2000,
    mouseDrag: false
  };

  created() {
    getMovieDetailsById("337401").then(response => {
      response.data.src =
        "https://www.denofgeek.com/wp-content/uploads/2020/09/boycott-mulan-hero-image-2.png?fit=2000%2C500&resize=2000%2C500";
      this.movieTrending.push(response.data);

      getMovieDetailsById("299536").then(response => {
        response.data.src = "https://image.ibb.co/fvCZ3G/EMH1.jpg";
        this.movieTrending.push(response.data);
        for (let i = 0; i < this.movieTrending.length; i++) {
          this.movieTrending[i].poster_path =
            "https://image.tmdb.org/t/p/w500" +
            this.movieTrending[i].poster_path;
          if (this.movieTrending[i].overview.length >= 270) {
            this.movieTrending[i].overview =
              this.movieTrending[i].overview.substr(0, 270) + "...";
          }
          this.movieTrending[i].runtime = this.movieTrending[i].runtime + " m";
          console.log(this.movieTrending);
        }
      });
    });

    getPopularMovies().then(response => {
      this.popularMovies = response.data.results.slice(0, 10);
      for (let i = 0; i < 10; i++) {
        this.popularMovies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" + this.popularMovies[i].poster_path;
      }
    });

    getTopMovies().then(response => {
      this.topMovies = response.data.results.slice(0, 10);
      for (let i = 0; i < 10; i++) {
        this.topMovies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" + this.topMovies[i].poster_path;
      }
    });

    setInterval(() => {
      if (!this.pauseInterval) {
        if (this.movieTrendingShow >= 1) {
          this.movieTrendingShow = 0;
        } else {
          this.movieTrendingShow += 1;
        }
      }
    }, 5000);
  }
  public goToMovie(movieId): void {
    this.$router.push({ name: "DetailsPage", params: { id: movieId } });
  }
}
</script>
