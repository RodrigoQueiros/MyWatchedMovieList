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

    <!-- Sorting options -->
    <div class="sorting-titles">
      <h3
        class="sorting-title"
        @click="sortingOptions('mostPopular')"
        :class="sortingSelected == 'mostPopular'? currentSorting : ''"
      >Most popular</h3>
      <h3
        class="sorting-title"
        @click="sortingOptions('topRated')"
        :class="sortingSelected == 'topRated'? currentSorting : ''"
      >Top rated</h3>
      <h3
        class="sorting-title"
        @click="sortingOptions('upcoming')"
        :class="sortingSelected == 'upcoming'? currentSorting : ''"
      >Upcoming</h3>
    </div>
    <!-- Cards -->
    <div class="movie-cards" v-if="sortingSelected == 'mostPopular'">
      <div class="movie-card" v-for="movie in popularMovies" :key="movie.id">
        <Card :movie="movie" />
      </div>
    </div>
    <div class="movie-cards" v-if="sortingSelected == 'topRated'">
      <div class="movie-card" v-for="movie in topMovies" :key="movie.id">
        <Card :movie="movie" />
      </div>
    </div>
    <div class="movie-cards" v-if="sortingSelected == 'upcoming'">
      <div class="movie-card" v-for="movie in upcomingMovies" :key="movie.id">
        <Card :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Axios
import {
  getMovieDetailsById,
  getPopularMovies,
  getTopMovies,
  getUpcomingMovies
} from "../API/apiMovie";
// TS
import { Component, Vue } from "vue-property-decorator";
// Mixin
import GoToMovie from "../components/mixins/goToMovie";
// Component
import Card from "../components/Card.vue";

interface movieType {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
}

@Component({
  components: {
    Card
  },
  mixins: [GoToMovie]
})
export default class Home extends Vue {
  private pauseInterval: boolean = false;
  private movieTrendingShow: number = 0;
  private movieTrending: movieType[] = [];
  private popularMovies: movieType[] = [];
  private topMovies: movieType[] = [];
  private upcomingMovies: movieType[] = [];
  private sortingSelected: string = "mostPopular";
  // Css class
  private currentSorting: string = "current-sorting";

  public created() {
    // Get movies for hero trending
    getMovieDetailsById("337401").then(response => {
      // Add outside background images
      response.data.src =
        "https://www.denofgeek.com/wp-content/uploads/2020/09/boycott-mulan-hero-image-2.png?fit=2000%2C500&resize=2000%2C500";
      this.movieTrending.push(response.data);

      getMovieDetailsById("299536").then(response => {
        response.data.src = "https://image.ibb.co/fvCZ3G/EMH1.jpg";
        this.movieTrending.push(response.data);
        for (let i = 0; i < this.movieTrending.length; i++) {
          // Add the missing part to the poster image link
          this.movieTrending[i].poster_path =
            "https://image.tmdb.org/t/p/w500" +
            this.movieTrending[i].poster_path;
          // Limit the number of chars in the overview
          if (this.movieTrending[i].overview.length >= 270) {
            this.movieTrending[i].overview =
              this.movieTrending[i].overview.substr(0, 270) + "...";
          }
          // Add minutes to the runtime
          this.movieTrending[i].runtime = this.movieTrending[i].runtime + " m";
        }
      });
    });
    // Get popular movies
    getPopularMovies().then(response => {
      this.popularMovies = response.data.results.slice(0, 10);
      for (let i = 0; i < 10; i++) {
        // Correct the path
        this.popularMovies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" + this.popularMovies[i].poster_path;
        // Limit the number of chars in the title
        if (this.popularMovies[i].title.length >= 32) {
          this.popularMovies[i].title =
            this.popularMovies[i].title.substr(0, 32) + "...";
        }
      }
    });

    getTopMovies().then(response => {
      this.topMovies = response.data.results.slice(0, 10);
      for (let i = 0; i < 10; i++) {
        this.topMovies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" + this.topMovies[i].poster_path;
        if (this.topMovies[i].title.length >= 32) {
          this.topMovies[i].title =
            this.topMovies[i].title.substr(0, 32) + "...";
        }
      }
    });

    getUpcomingMovies().then(response => {
      this.upcomingMovies = response.data.results.slice(0, 10);
      for (let i = 0; i < 10; i++) {
        this.upcomingMovies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" +
          this.upcomingMovies[i].poster_path;

        if (this.upcomingMovies[i].title.length >= 32) {
          this.upcomingMovies[i].title =
            this.upcomingMovies[i].title.substr(0, 32) + "...";
        }
      }
    });
    // Change hero movie each 5s
    setInterval(() => {
      // Possible to pause it on hover
      if (!this.pauseInterval) {
        if (this.movieTrendingShow >= 1) {
          this.movieTrendingShow = 0;
        } else {
          this.movieTrendingShow += 1;
        }
      }
    }, 5000);
  }

  public sortingOptions(type: string): void {
    // Change the selected sorting option
    this.sortingSelected = type;
  }
}
</script>
