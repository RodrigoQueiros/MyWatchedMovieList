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
        <img class="hero-wallpaper" :src="movie.src" alt="Movie trending" />
      </div>

      <span class="hero-content">
        <h2 class="hero-trending-header">Trending</h2>
        <transition name="fade" mode="out-in">
          <div class="flex-container" v-show="movieTrendingShow==i">
            <img :src="movie.poster_path" alt="Movie poster trending" class="hero-trending-image" />
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
// TS
import { Component, Vue } from "vue-property-decorator";
// Mixin
import GoToMovie from "../components/mixins/goToMovie";
// Component
import Card from "../components/Card.vue";

@Component({
  components: {
    Card
  },
  mixins: [GoToMovie]
})
export default class Home extends Vue {
  private pauseInterval: boolean = false;
  private movieTrendingShow: number = 0;
  private movieTrending = this.$store.state.bannerMovies;
  private popularMovies = [];
  private topMovies = [];
  private upcomingMovies = [];
  private sortingSelected: string = "mostPopular";
  // Css class
  private currentSorting: string = "current-sorting";

  public async created() {
    // Get banner movies
    await this.$store.dispatch("getBannerMovies");
    this.movieTrending = this.$store.state.bannerMovies;
    console.log(this.movieTrending);

    // Get popular movies
    await this.$store.dispatch("getPopularMovies");
    this.popularMovies = this.$store.state.popularMovies;
    // Get top movies
    await this.$store.dispatch("getTopMovies");
    this.topMovies = this.$store.state.topMovies;

    // Get upcoming movies
    await this.$store.dispatch("getUpcomingMovies");
    this.upcomingMovies = this.$store.state.upcomingMovies;

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
