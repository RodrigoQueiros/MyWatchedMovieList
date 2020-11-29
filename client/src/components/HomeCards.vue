<template>
  <div class="movie-cards">
    <div class="movie-card" v-for="(movie,i) in movies" :key="`${i}-${movie.id}`">
      <Card :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// Component
import Card from "./Card.vue";
import { MovieModel } from "../store/models/models";

@Component({
  mixins: [],
  components: {
    Card
  }
})
export default class HomeCard extends Vue {
  @Prop({ required: true }) readonly movies: MovieModel[];
}
</script>