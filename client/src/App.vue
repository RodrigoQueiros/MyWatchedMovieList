<template>
  <div class="app">
    <Navbar />

    <div class="container margin-top" v-if="notLogin != 'Login' && notLogin != 'Signup'">
      <router-view />
    </div>
    <div class="margin-top" v-else>
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
    this.getRouteName();
  }
  public updated() {
    this.getRouteName();
  }

  public getRouteName(): void {
    const local = this.$route.name;
    if (local) {
      this.notLogin = local;
    }
  }
}
</script>

<style>
@import "./styles/main.css";
</style>
