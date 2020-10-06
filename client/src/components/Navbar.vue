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
          <a class="navbar-menu-link" href="#vono" id="vonoID">Home</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" href="#section3" id="section3ID">Catalog</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" href="#section3" id="section3ID">Categories</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" href="#section4" id="section4ID">Random Movie</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link" href="#section5" id="section5ID">Watch List</a>
        </li>
        <li class="navbar-menu-element">
          <a class="navbar-menu-link color-yellow" href="#packages" id="packagesID">Login</a>
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
