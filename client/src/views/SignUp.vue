<template>
  <div class="login">
    <div class="signup-box">
      <div class="signup-box-left">
        <h3>Sign up</h3>
        <label for="search-by-name" class="search-label">Name</label>
        <input
          class="search-input"
          type="text"
          placeholder="Search by name"
          name="search-by-name-input"
          v-on:keyup.enter="getMoviesByName()"
        />
        <label for="search-by-name" class="search-label">Email</label>
        <input
          class="search-input"
          type="text"
          placeholder="Search by name"
          name="search-by-name-input"
          v-on:keyup.enter="getMoviesByName()"
        />

        <label for="search-by-name" class="search-label">Password</label>
        <input
          class="search-input"
          type="password"
          placeholder="Search by name"
          name="search-by-name-input"
          v-on:keyup.enter="getMoviesByName()"
        />
        <button class="button-search" @click="goToPage('Home')">Sign up</button>
      </div>
      <div class="signup-box-right">
        <h3 class="color-white center-text">Already have an account?</h3>
        <p class="color-white center-text login-text">
          To never forget a movie you've watched before,
          <span class="color-yellow">create an account</span> and you'll be able to take note of all the movies you've seen.
        </p>
        <a class="btn" @click="goToPage('Login')">Login</a>
      </div>
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
export default class Signup extends Mixins(GoToPage) {
  public created() {}
}
</script>