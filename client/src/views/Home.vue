<template>
  <div class="home">
    <div class="hero">
      <div class="hero-gradient">
        <img class="hero-image" src="../assets/mulan-hero.png" alt />
      </div>
      <div class="hero-content">
        <h3>Trending</h3>
        <div>
          <img :src="'https://image.tmdb.org/t/p/w500' + movieTrending.poster_path" alt />
          <p>{{movieTrending.original_title}}</p>
          <p>{{movieTrending.overview}}</p>
        </div>
      </div>
    </div>

    <p>safasfasfas</p>
  </div>
</template>

<script lang="ts">
//Axios
import { getMovieDetailsById } from "../API/apiMovie";
//TS
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private movieTrending: object = {};
  private movies: Array<object> = [
    {
      name: "Preetish",
      age: "26"
    },
    {
      name: "John",
      age: "30"
    }
  ];
  created() {
    getMovieDetailsById("337401").then(response => {
      this.movieTrending = response.data;
    });
  }
}
</script>
