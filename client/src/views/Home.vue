<template>
  <div class="home">
    <!-- Hero Trending -->
    <div class="hero">
      <div class="hero-gradient">
        <img class="hero-wallpaper" src="../assets/mulan-hero.png" alt />
      </div>
      <div class="hero-content" @click="goToMovie(movieTrending.id)">
        <h3 class="hero-trending-header">Trending</h3>
        <div class="flex-container">
          <img :src="movieTrending.poster_path" alt class="hero-trending-image" />
          <div class="hero-trending-info">
            <h2 class="hero-trending-title">{{movieTrending.original_title}}</h2>
            <p class="hero-trending-text">{{movieTrending.overview}}</p>
          </div>
          <div class="hero-trending-more-info">
            <p class="hero-trending-extra-info">rating: {{movieTrending.vote_average}} / 10</p>
            <p class="hero-trending-extra-info">duration: {{movieTrending.runtime}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Most popular -->
    <h1>Most popular</h1>
    <div class="movie-cards">
      <div
        class="movie-card"
        v-for="movie in popularMovies"
        :key="movie.id"
        @click="goToMovie(movie.id)"
      >
        <img class="movie-card-image" :src="movie.poster_path" alt />
        <h2 class="movie-card-title">{{movie.original_title}}</h2>
      </div>
    </div>
    <!-- Top rated -->
    <h1>Top rated</h1>
    <VueSlickCarousel v-bind="settings" style="display:flex">
      <div
        class="movie-card"
        v-for="movie in popularMovies"
        :key="movie.id"
        @click="goToMovie(movie.id)"
      >
        <img class="movie-card-image" :src="movie.poster_path" alt />
        <h2 class="movie-card-title">{{movie.original_title}}</h2>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script lang="ts">
//Axios
import { getMovieDetailsById, getPopularMovies } from "../API/apiMovie";
//TS
import { Component, Vue } from "vue-property-decorator";
//Carousel
import VueSlickCarousel from "vue-slick-carousel";

interface movie {
  overview: string;
  original_title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
}

interface carouselSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  initialSlide: number;
  responsive: Array<object>;
}

interface pmovie {
  results: Array<object>;
}

@Component
export default class Home extends Vue {
  private movieTrending: movie = {
    overview: "",
    original_title: "",
    poster_path: "",
    runtime: "",
    vote_average: 0,
    id: 0
  };
  private popularMovies: pmovie = {
    results: []
  };
  private settings: carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  components: {
    VueSlickCarousel;
  };
  created() {
    getMovieDetailsById("337401").then(response => {
      this.movieTrending = response.data;
      this.movieTrending.poster_path =
        "https://image.tmdb.org/t/p/w500" + this.movieTrending.poster_path;
      if (this.movieTrending.overview.length >= 270) {
        this.movieTrending.overview =
          this.movieTrending.overview.substr(0, 270) + "...";
      }
      this.movieTrending.runtime = this.movieTrending.runtime + " m";
    });

    getPopularMovies().then(response => {
      this.popularMovies = response.data.results.slice(0, 5);
      for (let i = 0; i < 5; i++) {
        this.popularMovies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" + this.popularMovies[i].poster_path;
      }
      console.log(this.popularMovies);
    });
    console.log(this.settings);
  }
  public goToMovie(movieId): void {
    this.$router.push({ name: "DetailsPage", params: { id: movieId } });
  }
}
</script>
