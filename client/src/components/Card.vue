<template>
  <div class="card">
    <div class="movie-card-info">
      <img class="movie-card-image" :src="movie.poster_path" alt="movie poster" />
      <!-- Overlay on hover @click="goToMovie(movie.id)"-->
      <div class="overlay">
        <p class="text-overlay">{{movie.vote_average}}</p>
        <button class="button-card" @click="addToList()" v-if="alreadyAdded == false">Add to list</button>
        <button
          class="button-card remove"
          @click="removeFromList()"
          v-else-if="alreadyAdded == true"
        >Remove</button>
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
// Models
import { WatchModel, MovieModel } from "../store/models/models";

@Component({
  mixins: [GoToMovie]
})
export default class Card extends Vue {
  @Prop({ required: true }) readonly movie: MovieModel;
  private alreadyAdded: boolean = false;

  public created() {
    let local = localStorage.getItem("watch-list");
    if (local) {
      let obj = JSON.parse(local);

      //This foreach was giving me problems with the type of variables not being identified
      //after trying different methods, this was the first one that worked
      obj.forEach((element: WatchModel, i: number) => {
        if (element.id == this.movie.id) {
          this.alreadyAdded = true;
        }
      });
    }
  }

  public addToList(): void {
    this.$store.dispatch("addToList", this.movie);
    this.alreadyAdded = true;
  }

  public removeFromList(): void {
    this.$store.dispatch("removeFromList", this.movie);
    this.alreadyAdded = false;
  }
}
</script>

