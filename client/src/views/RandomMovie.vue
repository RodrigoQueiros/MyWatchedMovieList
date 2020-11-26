<template>
  <div class="random-movie">
    <template v-if="!loading">
      <div class="random-movie-card">
        <h2 class="random-movie-title">{{movie.title}}</h2>
        <img :src="movie.poster_path" alt="Movie poster" class="random-movie-img" />
        <div class="card-content">
          <p class="card-content-overview">{{movie.overview}}</p>
        </div>
        <div class="buttons">
          <a class="btn" @click="goToMovie(movie.id)">Details</a>
          <a class="btn" @click="randomMovie()">Random Movie</a>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
// TS
import { Component, Vue } from "vue-property-decorator";
// Mixin
import GoToMovie from "../components/mixins/goToMovie";

@Component({
  components: {},
  mixins: [GoToMovie]
})
export default class DetailsPage extends Vue {
  private movie = this.$store.state.randomMovie;
  private loading: boolean = true;

  public async created() {
    await this.randomMovie();
  }

  private async randomMovie() {
    await this.$store.dispatch("getRandomMovie");
    this.movie = this.$store.state.randomMovie;
    this.loading = false;
  }
}
</script>