<template>
  <div class="categories container-inside">
    <h1 class="categories-header">Categories</h1>
    <div class="categories-name">
      <!-- Categories card -->
      <div
        class="categories-space"
        v-for="(genre,i) in genres"
        :key="`${i}-${genre.id}`"
        @click="goToGenre(genre.id)"
      >
        <CategoriesCard :genre="genre" />
      </div>
    </div>
  </div>
</template>
    
<script lang="ts">
// TS
import { Component, Vue } from "vue-property-decorator";
// Mixin
import GoToGenre from "../components/mixins/goToGenre";
import CategoriesCard from "../components/CategoriesCard.vue";

@Component({
  components: {
    CategoriesCard
  },
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
