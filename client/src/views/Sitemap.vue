<template>
  <div class="sitemap">
    <h1 class="sitemap-header">Categories</h1>
    <div class="sitemap-space">
      <a class="sitemap-text" @click="goToPage('Home')">● Home</a>
      <a class="sitemap-text first" @click="goToPage('Catalog')">● Catalog</a>
      <a class="sitemap-text secondary" @click="goToPage('Catalog')">● Movie Details page</a>
      <a class="sitemap-text first" @click="goToPage('Categories')">● Categories</a>
      <a class="sitemap-text first" @click="goToPage('RandomMovie')">● Random movie</a>
      <a class="sitemap-text first" @click="goToPage('Login')">● Login</a>
      <a class="sitemap-text secondary" @click="goToPage('Signup')">● Sign p</a>
      <a class="sitemap-text first" @click="goToPage('WatchList')">● Watch List</a>
      <a class="sitemap-text first" @click="goToPage('Sitemap')">● Sitemap</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// Mixin
import GoToPage from "../components/mixins/goToPage";

@Component({
  mixins: [GoToPage]
})
export default class Sitemap extends Vue {
  public created() {}
}
</script>