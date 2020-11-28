<template>
  <div class="categories container-inside">
    <h1 class="categories-header">Categories</h1>
    <div class="categories-name">
      <!-- Categories card -->
      <div
        class="categories-space"
        v-for="genre in genres"
        :key="genre.id"
        @click="goToGenre(genre.id)"
      >
        <div class="categories-gradient" :style="{ color: genre.color}">
          <img
            v-bind:src="require('../assets/categories/' + genre.img)"
            alt="descriptive image of the category"
            class="categories-card-img"
          />
          <p class="categories-text">{{genre.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
// TS
import { Component, Vue } from "vue-property-decorator";
// Mixin
import GoToGenre from "../components/mixins/goToGenre";

@Component({
  components: {},
  mixins: [GoToGenre]
})
export default class CategoriesPage extends Vue {
  private genres = this.$store.state.genres;

  public async created() {
    await this.$store.dispatch("getCategories");
    this.genres = this.$store.state.genres;
  }
}
</script>
