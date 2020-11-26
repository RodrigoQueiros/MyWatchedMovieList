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
// Models
import { WatchModel } from "../store/models/models";

@Component({
  components: {
    Card
  }
})
export default class Watchlist extends Vue {
  private watchList = [];
  private completed: WatchModel[] = [];

  public async created() {
    await this.$store.dispatch("getWatchList");
    this.watchList = this.$store.state.watchList;
    this.getCompleted();
  }

  private getCompleted() {
    this.watchList.forEach((element: WatchModel) => {
      if (element.watchState == "completed") {
        this.completed.push(element);
      }
    });
  }
}
</script>