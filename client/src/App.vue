<template>
  <div class="app">
    <Navbar />
    <div class="container margin-top">
      <router-view />
    </div>
    <div v-if="notLogin != 'Login' && notLogin != 'Signup'">
      <Footer />
    </div>
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
  private notLogin: string = "";
  public created() {
    this.notLogin = this.$route.name;
    console.log(this.notLogin);
  }
}
</script>

<style>
@import "./styles/main.css";
</style>
