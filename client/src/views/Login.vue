<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-left">
        <h3 class="color-white center-text">Don't you have an account yet?</h3>
        <p class="color-white center-text login-text">
          To never forget a movie you've watched before,
          <span class="color-yellow">create an account</span> and you'll be able to take note of all the movies you've seen.
        </p>
        <a class="btn">Create account</a>
      </div>
      <div class="login-box-right">
        <h3>Login</h3>
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
        <button class="button-search">Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TS
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Login extends Vue {
  public created() {}
}
</script>