<template>
  <div class="categories">
    <h1 class="categories-header">Categories</h1>
    <div class="categories-name">
      <div class="categories-space" v-for="genre in genres" :key="genre.id">
        <p class="categories-text">{{genre.name}}</p>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
//TS
import { Component, Vue } from "vue-property-decorator";
//Axios
import { getAllGenres } from "../API/apiGenre";

type genreType = {
  name: string;
  id: number;
};

@Component({
  components: {}
})
export default class CategoriesPage extends Vue {
  private genres: genreType[] = [];
  created() {
    getAllGenres().then(response => {
      this.genres = response.data.genres;
    });
  }
  public goToGenre(movieId): void {
    //Go to the details page of movie
    this.$router.push({ path: "/catalog/" + movieId });
  }
}
</script>
