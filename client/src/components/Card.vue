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

interface movieModel {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
}

interface watchListModel {
  title: string;
  poster_path: string;
  vote_average: number;
  watchState: string;
  id: number;
}

@Component({
  mixins: [GoToMovie]
})
export default class Card extends Vue {
  @Prop({ required: true }) readonly movie: movieModel;
  private alreadyAdded: boolean = false;

  public created() {
    let local = localStorage.getItem("watch-list");
    if (local) {
      let obj = JSON.parse(local);

      //This foreach was giving me problems with the type of variables not being identified
      //after trying different methods, this was the first one that worked
      obj.forEach((element: watchListModel, i: number) => {
        if (element.id == this.movie.id) {
          this.alreadyAdded = true;
        }
      });
    }
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

