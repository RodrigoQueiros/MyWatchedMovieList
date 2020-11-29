<template>
  <div class="catalog-card1">
    <div class="catalog-card1-img-space">
      <img :src="movie.poster_path" alt="Movie Poster" />
    </div>
    <div class="catalog-card1-info-space">
      <div>
        <h2>{{movie.title}}</h2>
        <p class="catalog-card1-info-text">
          <b>Overview:</b>
          {{movie.overview}}
        </p>
      </div>
      <button class="button-card card1">Add to list</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { MovieModel } from "../store/models/models";

@Component({
  mixins: []
})
export default class Card2 extends Vue {
  @Prop({ required: true }) readonly movie: MovieModel;
}
</script>