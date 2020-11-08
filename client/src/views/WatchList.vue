<template>
  <div class="watch-list">
    <h2>Plan to watch</h2>
    <p>No movies added</p>

    <h2>Completed</h2>
    <p>No movies added</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// Mixin
import GoToPage from "../components/mixins/goToPage";

@Component({
  mixins: [GoToPage]
})
export default class Watchlist extends Vue {
  public created() {}
}
</script>