<template>
  <div class="random-movie">
    <div class="random-movie-card">
      <h2>{{movie.title}}</h2>
      <img :src="movie.poster_path" alt class="random-movie-img" />
      <div class="card-content">
        <p class="card-content-overview">{{movie.overview}}</p>
      </div>
      <div class="buttons">
        <a class="btn" @click="goToMovie(movie.id)">Details</a>
        <a class="btn" @click="randomMovie()">Random Movie</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//TS
import { Component, Vue } from "vue-property-decorator";
//Axios
import { getRandomMovie } from "../API/apiMovie";

interface movieModel {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
}

@Component({
  components: {}
})
export default class DetailsPage extends Vue {
  private movie: movieModel = {
    overview: "",
    title: "",
    poster_path: "",
    runtime: "",
    vote_average: 0,
    id: 0,
    src: ""
  };

  created() {
    this.randomMovie();
  }

  private randomMovie(): void {
    let num1 = Math.floor(Math.random() * 499) + 1;
    let num2 = Math.floor(Math.random() * 20);
    console.log(num1);
    console.log(num2);
    getRandomMovie(num1.toString()).then(response => {
      this.movie = response.data.results[num2];

      this.movie.poster_path =
        "https://image.tmdb.org/t/p/w500" + this.movie.poster_path;
      console.log(this.movie);
    });
  }
  public goToMovie(movieId): void {
    //Go to the details page of movie
    this.$router.push({ path: "/catalog/" + movieId });
  }
}
</script>