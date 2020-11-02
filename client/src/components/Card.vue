<template>
  <div class="card">
    <div class="movie-card-info">
      <img class="movie-card-image" :src="movie.poster_path" alt />
      <!-- Overlay on hover -->
      <div class="overlay" @click="goToMovie(movie.id)">
        <p class="text-overlay">{{movie.vote_average}}</p>
        <button class="button-card">Add to list</button>
      </div>
    </div>
    <!-- Title -->
    <div class="card-title-space">
      <h2 class="movie-card-title" @click="goToMovie(movie.id)">{{movie.title}}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GoToMovie from "../components/mixins/goToMovie";

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
  mixins: [GoToMovie]
})
export default class Card extends Vue {
  private movie: movieModel = this.$props.movie;
}
</script>

