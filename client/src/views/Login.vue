<template>
  <div class="login">
    <div class="login-box">
      <!-- To create an account side -->
      <div class="login-box-left">
        <h3 class="color-white center-text">Don't you have an account yet?</h3>
        <p class="color-white center-text login-text">
          To never forget a movie you've watched before,
          <span class="color-yellow">create an account</span> and you'll be able to take note of all the movies you've seen.
        </p>
        <a class="btn" @click="goToPage('Signup')">Create account</a>
      </div>
      <!-- Login side -->
      <form class="login-box-right">
        <h3>Login</h3>
        <label for="input-login-email" class="search-label">Email</label>
        <input
          class="search-input"
          type="text"
          placeholder="Search by name"
          id="input-login-email"
          v-on:keyup.enter="getMoviesByName()"
        />

        <label for="input-login-password" class="search-label">Password</label>
        <input
          class="search-input"
          type="password"
          placeholder="Search by name"
          id="input-login-password"
          v-on:keyup.enter="getMoviesByName()"
        />
        <button class="button-search" @click="goToPage('Home')">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
// TS
import { Component, Vue, Mixins } from "vue-property-decorator";
import GoToPage from "../components/mixins/goToPage";

@Component({
  components: {},
  mixins: [GoToPage]
})
export default class Login extends Mixins(GoToPage) {
  public created() {}
}
</script>