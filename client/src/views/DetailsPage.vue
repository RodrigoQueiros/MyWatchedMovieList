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
      <div class="movie-cards">
        <h3 class="center-text" v-if="recommendedMovies.length == 0">No recommended movies ):</h3>
        <div class="movie-card" v-for="movie in recommendedMovies" :key="movie.id">
          <div class="card">
            <div class="movie-card-info">
              <img class="movie-card-image" :src="movie.poster_path" alt="Movie poster" />
              <div class="overlay" @click="goToMovie(movie.id)">
                <p class="text-overlay">{{movie.vote_average}}</p>
                <button class="button-card">Add to list</button>
              </div>
            </div>
            <div class="card-title-space">
              <h2 class="movie-card-title" @click="goToMovie(movie.id)">{{movie.title}}</h2>
            </div>
          </div>
        </div>
      </div>
      <!-- Recomend 2 based on random movie genre -->
      <h2 class="recommend-movies-title">If you like {{randomGenre.name}}</h2>
      <div class="movie-cards">
        <h3 class="center-text" v-if="recommendedMoviesbyGenre.length == 0">No recommended movies ):</h3>
        <div class="movie-card" v-for="movie in recommendedMoviesbyGenre" :key="movie.id">
          <div class="card">
            <div class="movie-card-info">
              <img class="movie-card-image" :src="movie.poster_path" alt="Movie poster" />
              <div class="overlay" @click="goToMovie(movie.id)">
                <p class="text-overlay">{{movie.vote_average}}</p>
                <button class="button-card">Add to list</button>
              </div>
            </div>
            <div class="card-title-space">
              <h2 class="movie-card-title" @click="goToMovie(movie.id)">{{movie.title}}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TS
import { Component, Vue } from "vue-property-decorator";
// Axios
import { getMovieDetailsById, getRecommendedMovieById } from "../API/apiMovie";
import { getMoviesByGenreId } from "../API/apiDiscover";

// Movie Model
interface movieModel {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
  genres: genreType[];
}
interface genreModel {
  name: string;
  id: number;
}
interface movieType {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
}

interface genreType {
  name: string;
  id: number;
}
interface watchListModel {
  title: string;
  poster_path: string;
  vote_average: number;
  watchState: string;
  id: number;
}

@Component({
  components: {}
})
export default class DetailsPage extends Vue {
  private movieId: string = "";
  private alreadyAdded: boolean = false;
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
  public created() {
    this.movieId = this.$route.params.id;
    this.getMovie();
  }
  public goToMovie(movieId: number): void {
    // Go to the details page of movie
    this.$router.push({ path: "/catalog/" + movieId.toString() });
    // Since Vue doesnt update the page when its the same path only with diferent params, this was my solution to update data
    this.movieId = this.$route.params.id;
    this.getMovie();
  }
  public getMovie(): void {
    getMovieDetailsById(this.movieId).then(response => {
      this.movie = response.data;
      // correct the path
      this.movie.poster_path =
        "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;
      // Add minutes to the time
      this.movie.runtime = this.movie.runtime + " m";
      // Get a random genre to recommend
      this.randomGenre = this.movie.genres[
        Math.floor(Math.random() * this.movie.genres.length)
      ];
      //Button state
      this.alreadyAdded = false;
      let local = localStorage.getItem("watch-list");
      if (local) {
        let obj = JSON.parse(local);

        obj.forEach((element: watchListModel) => {
          if (element.id == this.movie.id) {
            this.alreadyAdded = true;
          }
        });

        getMoviesByGenreId(this.randomGenre.id.toString()).then(response => {
          this.recommendedMoviesbyGenre = response.data.results.slice(0, 3);

          this.recommendedMoviesbyGenre.forEach((genre, i) => {
            // Correct the path
            this.recommendedMoviesbyGenre[i].poster_path =
              "https://image.tmdb.org/t/p/w500" + genre.poster_path;
            // Limit the number of chars in the title
            if (genre.title.length >= 32) {
              this.recommendedMoviesbyGenre[i].title =
                genre.title.substr(0, 32) + "...";
            }
          });
        });
      }
    });

    getRecommendedMovieById(this.movieId).then(response => {
      this.recommendedMovies = response.data.results.slice(0, 3);

      this.recommendedMovies.forEach((movie, i) => {
        // Correct the path
        this.recommendedMovies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        // Limit the number of chars in the title
        if (movie.title.length >= 32) {
          this.recommendedMovies[i].title = movie.title.substr(0, 32) + "...";
        }
      });
    });
  }

  public addToList(): void {
    let tempMovie = {
      title: this.movie.title,
      poster_path: this.movie.poster_path,
      vote_average: this.movie.vote_average,
      id: this.movie.id,
      watchState: "completed"
    };

    let local = localStorage.getItem("watch-list");
    if (local) {
      let obj = JSON.parse(local);
      obj.push(tempMovie);
      localStorage.setItem("watch-list", JSON.stringify(obj));
    } else {
      let temp = [];
      temp.push(tempMovie);
      localStorage.setItem("watch-list", JSON.stringify(temp));
    }
    this.alreadyAdded = true;
  }

  public removeFromList(): void {
    let local = localStorage.getItem("watch-list");
    if (local) {
      let obj = JSON.parse(local);
      console.log(obj);

      obj.forEach((element: watchListModel, i: number) => {
        if (element.id == this.movie.id) {
          obj.splice(i, 1);
        }
        this.alreadyAdded = false;
      });

      localStorage.setItem("watch-list", JSON.stringify(obj));
    }
  }
}
</script>