<template>
  <div class="details-page">
    <div class="card-details">
      <div class="card-details-left">
        <img :src="movie.poster_path" class="details-movie-image" />
      </div>
      <div class="card-details-right">
        <h1>{{movie.title}}</h1>
        <div class="details-movie-text">
          <p>
            <b>Genres:</b>
            <span v-for="(genre,i) in movie.genres" :key="genre.id">
              {{" " + genre.name + " "}}
              <span v-if="(movie.genres.length - 2) >= i">-</span>
            </span>
          </p>
          <p>
            <b>Producers:</b>
            <span v-for="(prod,i) in movie.production_companies" :key="prod.id">
              {{" " + prod.name + " "}}
              <span v-if="(movie.production_companies.length - 2) >= i">-</span>
            </span>
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
    </div>

    <h2 class="recommend-movies-title">If you liked {{movie.title}}</h2>
    <div class="movie-cards">
      <h3 class="center-text" v-if="recommendedMovies.length == 0">No recommended movies ):</h3>
      <div class="movie-card" v-for="movie in recommendedMovies" :key="movie.id">
        <div @click="goToMovie(movie.id)">
          <div class="movie-card-info">
            <img class="movie-card-image" :src="movie.poster_path" alt />
            <div class="overlay">
              <p class="text-overlay">rating: {{movie.vote_average}}</p>
              <p class="text-overlay">{{movie.release_date}}</p>
            </div>
          </div>
          <div class="asd">
            <h2 class="movie-card-title">{{movie.title}}</h2>
          </div>
        </div>
      </div>
    </div>

    <h2 class="recommend-movies-title">If you like {{randomGenre.name}}</h2>
    <div class="movie-cards">
      <h3 class="center-text" v-if="recommendedMoviesbyGenre.length == 0">No recommended movies ):</h3>
      <div class="movie-card" v-for="movie in recommendedMoviesbyGenre" :key="movie.id">
        <div @click="goToMovie(movie.id)">
          <div class="movie-card-info">
            <img class="movie-card-image" :src="movie.poster_path" alt />
            <div class="overlay">
              <p class="text-overlay">rating: {{movie.vote_average}}</p>
              <p class="text-overlay">{{movie.release_date}}</p>
            </div>
          </div>
          <div class="asd">
            <h2 class="movie-card-title">{{movie.title}}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//TS
import { Component, Vue } from "vue-property-decorator";
//Axios
import { getMovieDetailsById, getRecommendedMovieById } from "../API/apiMovie";
import { getMoviesByGenreId } from "../API/apiDiscover";

//Movie Model
interface movieModel {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
  genres: Array<genreType>;
}
interface genreModel {
  name: string;
  id: number;
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

type genreType = {
  name: string;
  id: number;
};

@Component({
  components: {}
})
export default class DetailsPage extends Vue {
  private movieId: string = "";
  private movie: movieModel = {
    overview: "",
    title: "",
    poster_path: "",
    runtime: "",
    vote_average: 0,
    id: 0,
    src: "",
    genres: []
  };
  private randomGenre: genreModel = {
    name: "",
    id: 0
  };
  private recommendedMoviesbyGenre: movieType[] = [];
  private recommendedMovies: movieType[] = [];
  created() {
    this.movieId = this.$route.params.id;
    this.getMovie();
  }
  public goToMovie(movieId): void {
    //Go to the details page of movie
    this.$router.push({ path: "/catalog/" + movieId });
    // Since Vue doesnt update the page when its the same path only with diferent params, this was my solution to update data
    this.movieId = this.$route.params.id;
    this.getMovie();
  }
  public getMovie(): void {
    getMovieDetailsById(this.movieId).then(response => {
      this.movie = response.data;

      this.movie.poster_path =
        "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;

      this.movie.runtime = this.movie.runtime + " m";

      this.randomGenre = this.movie.genres[
        Math.floor(Math.random() * this.movie.genres.length)
      ];
      getMoviesByGenreId(this.randomGenre.id.toString()).then(response => {
        this.recommendedMoviesbyGenre = response.data.results.slice(0, 3);
        for (let i = 0; i < 3; i++) {
          //Correct the path
          this.recommendedMoviesbyGenre[i].poster_path =
            "https://image.tmdb.org/t/p/w500" +
            this.recommendedMoviesbyGenre[i].poster_path;
          // Limit the number of chars in the title
          if (this.recommendedMoviesbyGenre[i].title.length >= 32) {
            this.recommendedMoviesbyGenre[i].title =
              this.recommendedMoviesbyGenre[i].title.substr(0, 32) + "...";
          }
        }
      });
    });

    getRecommendedMovieById(this.movieId).then(response => {
      this.recommendedMovies = response.data.results.slice(0, 3);
      for (let i = 0; i < 3; i++) {
        //Correct the path
        this.recommendedMovies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" +
          this.recommendedMovies[i].poster_path;
        // Limit the number of chars in the title
        if (this.recommendedMovies[i].title.length >= 32) {
          this.recommendedMovies[i].title =
            this.recommendedMovies[i].title.substr(0, 32) + "...";
        }
      }
    });
  }
}
</script>