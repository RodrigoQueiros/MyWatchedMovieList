<template>
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
          <h2 class="movie-card-title" @click="buttonClicked(movie.id)">{{movie.title}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { MovieModel } from "../store/models/models";

@Component({
  mixins: []
})
export default class CategoriesCard extends Vue {
  @Prop({ required: true }) readonly recommendedMovies: MovieModel[];
  @Emit()
  buttonClicked(movieId: number) {
    this.$router.push({ path: "/catalog/" + movieId.toString() });
  }
}
</script>