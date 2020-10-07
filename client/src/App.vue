<template>
  <div class="app">
    <Navbar />
    <div class="container margin-top">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

@Component({
  components: {
    Navbar,
    Footer
  }
})
export default class App extends Vue {
  created() {
    // Find item provoking body overflow
    var docWidth = document.documentElement.offsetWidth;

    [].forEach.call(document.querySelectorAll("*"), function(el) {
      if (el.offsetWidth > docWidth) {
        console.log(el);
      }
    });
  }
}
</script>

<style>
@import "./styles/main.css";
</style>
