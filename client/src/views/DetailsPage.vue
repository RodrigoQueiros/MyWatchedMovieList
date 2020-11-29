<template>
  <div class="details-page">
    <div class="card-details">
      <div class="card-details-left">
        <!-- Image and button -->
        <img :src="movie.poster_path" class="details-movie-image" />
        <div class="details-button up">
          <button
            class="button-search"
            @click="addToList()"
            v-if="alreadyAdded == false"
          >Add to list</button>
          <button
            class="button-search remove"
            @click="removeFromList()"
            v-else-if="alreadyAdded == true"
          >Remove</button>
        </div>
      </div>
      <!-- Title and info -->
      <div class="card-details-right">
        <h1>{{movie.title}}</h1>
        <div class="details-movie-text">
          <p>
            <b>Genres:</b>
            {{addLinesBetweenGenre}}
          </p>
          <p>
            <b>Producers:</b>
            {{addLinesBetweenProducers}}
          </p>
          <p>
            <b>Release date:</b>
            {{" " + movie.release_date}}
          </p>

          <p>
            <b>Status:</b>
            {{" " + movie.status}}
          </p>

          <p>
            <b>Rating:</b>
            {{" " + movie.vote_average}}
          </p>

          <p>
            <b>Runtime:</b>
            {{" " + movie.runtime}}
          </p>

          <p>
            <b>Sinopse:</b>
            {{" " + movie.overview}}
          </p>
        </div>
      </div>
      <div class="details-button down">
        <button class="button-search" @click="addToList()" v-if="alreadyAdded == false">Add to list</button>
        <button
          class="button-search remove"
          @click="removeFromList()"
          v-else-if="alreadyAdded == true"
        >Remove</button>
      </div>
    </div>
    <!-- Recomend 1 based on the movie -->
    <div class="recommend-space">
      <h2 class="recommend-movies-title">If you liked {{movie.title}}</h2>
      <DetailsRecommend :recommendedMovies="recommendedMovies" @button-clicked="goToMovie" />
      <!-- Recomend 2 based on random movie genre -->
      <h2 class="recommend-movies-title">If you like {{randomGenre.name}}</h2>
      <DetailsRecommend :recommendedMovies="recommendedMoviesbyGenre" @button-clicked="goToMovie" />
    </div>
  </div>
</template>

<script lang="ts">
// TS
import { Component, Vue } from "vue-property-decorator";
// Models
import {
  WatchModel,
  MovieModel,
  GenreModel,
  ProducersModel
} from "../store/models/models";
import DetailsRecommend from "../components/DetailsRecommend.vue";

@Component({
  components: {
    DetailsRecommend
  }
})
export default class DetailsPage extends Vue {
  private movieId: string = "";
  private alreadyAdded: boolean = false;
  private movie: MovieModel = {
    overview: "",
    title: "",
    poster_path: "",
    runtime: "",
    vote_average: 0,
    id: 0,
    src: "",
    genres: [],
    production_companies: []
  };
  private randomGenre: GenreModel = {
    name: "",
    id: 0
  };
  private recommendedMoviesbyGenre: MovieModel[] = [];
  private recommendedMovies: MovieModel[] = [];
  public async created() {
    this.movieId = this.$route.params.id;
    await this.getMovie();
  }
  public goToMovie(movieId: number): void {
    // Go to the details page of movie
    this.$router.push({ path: "/catalog/" + movieId.toString() });
    // Since Vue doesnt update the page when its the same path only with diferent params, this was my solution to update data
    this.movieId = this.$route.params.id;
    this.getMovie();
  }
  public async getMovie() {
    await this.$store.dispatch("getMovieDetailsById", this.movieId);
    this.movie = this.$store.state.detailsMovie;
    this.randomGenre = this.$store.state.detailsMovie.randomGenre;

    //Button state
    this.alreadyAdded = false;
    this.$store.dispatch("getWatchList");
    let local = this.$store.state.watchList;

    if (local) {
      local.forEach((element: WatchModel) => {
        if (element.id == this.movie.id) {
          this.alreadyAdded = true;
        }
      });
    }
    // Recommended
    await this.$store.dispatch(
      "getMoviesByGenreId",
      this.randomGenre.id.toString()
    );
    this.recommendedMoviesbyGenre = this.$store.state.recommendedMoviesbyGenre;

    await this.$store.dispatch("getRecommendedMovieById", this.movieId);
    this.recommendedMovies = this.$store.state.recommendedMovies;
  }

  public addToList(): void {
    this.$store.dispatch("addToList", this.movie);
    this.alreadyAdded = true;
  }

  public removeFromList(): void {
    this.$store.dispatch("removeFromList", this.movie);
    this.alreadyAdded = false;
  }
  get addLinesBetweenGenre(): string {
    let phrase = " ";
    this.movie.genres.forEach((element, i: number) => {
      phrase += element.name + " ";
      if (this.movie.genres.length - 2 >= i) {
        phrase += "- ";
      }
    });
    return phrase;
  }
  get addLinesBetweenProducers(): string {
    let phrase = " ";
    this.movie.production_companies.forEach((element, i: number) => {
      phrase += element.name + " ";
      if (this.movie.production_companies.length - 2 >= i) {
        phrase += "- ";
      }
    });
    return phrase;
  }
}
</script>