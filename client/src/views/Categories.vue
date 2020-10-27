<template>
  <div class="categories">
    <h1 class="categories-header">Categories</h1>
    <div class="categories-name">
      <div
        class="categories-space"
        v-for="genre in genres"
        :key="genre.id"
        @click="goToGenre(genre.id)"
      >
        <div class="categories-gradient" :style="{ color: genre.color}">
          <img
            v-bind:src="require('../assets/categories/' + genre.img)"
            alt
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
// Axios
import { getAllGenres } from "../API/apiGenre";
// Mixin
import GoToGenre from "../components/mixins/goToGenre";

interface genreType {
  name: string;
  id: number;
  img: string;
  color: string;
}

interface genreImage {
  name: string;
  color: string;
}

@Component({
  components: {},
  mixins: [GoToGenre]
})
export default class CategoriesPage extends Vue {
  private genres: genreType[] = [];
  private images: genreImage[] = [
    {
      name: "action.jpg",
      color: "rgba(200, 100, 0, 0.6)"
    },
    {
      name: "adventure.jpg",
      color: "rgba(50, 50, 150, 0.6)"
    },
    {
      name: "animation.jpg",
      color: "rgba(150, 150, 20, 0.6)"
    },
    {
      name: "comedy.jpg",
      color: "rgba(50, 200, 100, 0.6)"
    },
    {
      name: "crime.jpg",
      color: "rgba(100, 0, 100, 0.6)"
    },
    {
      name: "documentary.jpg",
      color: "rgba(100, 30, 10, 0.6)"
    },
    {
      name: "drama.jpg",
      color: "rgba(200, 150, 200, 0.6)"
    },
    {
      name: "family.jpg",
      color: "rgba(70, 155, 170, 0.6)"
    },
    {
      name: "fantasy.jpg",
      color: "rgba(200, 50, 180, 0.6)"
    },
    {
      name: "history.jpg",
      color: "rgba(120, 100, 60, 0.6)"
    },
    {
      name: "horror.jpg",
      color: "rgba(80, 5, 20, 0.6)"
    },
    {
      name: "music.jpg",
      color: "rgba(150, 150, 100, 0.6)"
    },
    {
      name: "mystery.jpg",
      color: "rgba(30, 80, 40, 0.6)"
    },
    {
      name: "romance.jpg",
      color: "rgba(200, 20, 20, 0.6)"
    },
    {
      name: "science.jpg",
      color: "rgba(80, 5, 220, 0.6)"
    },
    {
      name: "tvmovie.jpg",
      color: "rgba(220, 125, 70, 0.6)"
    },
    {
      name: "thriller.jpg",
      color: "rgba(70, 20, 20, 0.6)"
    },
    {
      name: "war.jpg",
      color: "rgba(130, 105, 100, 0.6)"
    },
    {
      name: "western.jpg",
      color: "rgba(200, 150, 50, 0.6)"
    }
  ];
  public created() {
    getAllGenres().then(response => {
      this.genres = response.data.genres;
      for (let i = 0; i < this.genres.length; i++) {
        this.genres[i].img = this.images[i].name;
        this.genres[i].color = this.images[i].color;
      }
      console.log(this.genres);
    });
  }
}
</script>
