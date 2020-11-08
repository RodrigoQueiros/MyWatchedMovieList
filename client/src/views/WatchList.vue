<template>
  <div class="watch-list">
    <h3 class="watch-list-header">Plan to watch</h3>
    <p class="watch-list-text">No movies added</p>

    <h3 class="watch-list-header">Completed</h3>
    <p class="watch-list-text" v-if="!(completed.length != 0)">No movies added</p>
    <div class="movie-cards">
      <div class="movie-card" v-for="movie in completed" :key="movie.id">
        <Card :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// Component
import Card from "../components/Card.vue";

interface watchType {
  title: string;
  poster_path: string;
  vote_average: number;
  id: number;
  watchState: string;
}

@Component({
  components: {
    Card
  }
})
export default class Watchlist extends Vue {
  private completed: watchType[] = [];
  private planToWatch: watchType[] = [];

  public created() {
    let local = localStorage.getItem("watch-list");
    if (local) {
      let tempVar = JSON.parse(local);

      for (let i = 0; i < tempVar.length; i++) {
        if (tempVar[i].watchState == "completed") {
          this.completed.push(tempVar[i]);
        } else if (tempVar[i].watchState == "planToWatch") {
          this.planToWatch.push(tempVar[i]);
        }
      }
    }
  }
}
</script>