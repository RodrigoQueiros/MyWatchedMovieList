<template>
  <div class="categories-gradient" :style="{ color: genre.color}">
    <img
      v-bind:src="require('../assets/categories/' + genre.img)"
      alt="descriptive image of the category"
      class="categories-card-img"
    />
    <p class="categories-text">{{genre.name}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GenreModel } from "../store/models/models";

@Component({
  mixins: []
})
export default class CategoriesCard extends Vue {
  @Prop({ required: true }) readonly genre: GenreModel;
}
</script>