<template>
  <div class="navbar">
    <div class="container">
      <a href class="navbar-logo-a">
        <img src="../assets/logo.png" alt="logo vono" class="navbar-logo inside-left" />
      </a>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon inside-right" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="navbar-menu inside-right">
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" @click="goToPage('Home')">Home</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" @click="goToPage('Catalog')">Catalog</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" @click="goToPage('Categories')">Categories</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" @click="goToPage('RandomMovie')">Random Movie</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" @click="goToPage('WatchList')">Watch List</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link color-yellow" @click="goToPage('Login')">Login</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  @Prop() private msg!: string;
  public goToPage(page): void {
    this.$router.push({ name: page });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
