<template>
  <div class="navbar">
    <div class="container">
      <a href class="navbar-logo-a">
        <img @click="goToPage('Home')" src="../assets/logo.png" alt="logo vono" class="navbar-logo" />
      </a>
      <input class="menu-btn" type="checkbox" id="menu-btn" v-model="checked" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="navbar-menu">
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
  private checked: boolean = false;
  @Prop() private msg!: string;
  public goToPage(page: string): void {
    this.$router.push({ name: page });
    this.checked = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
