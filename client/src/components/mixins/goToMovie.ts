import { Component, Vue } from "vue-property-decorator";

@Component
class GoToMovie extends Vue {
  public goToMovie(movieId: number): void {
    // Go to the details page of movie
    this.$router.push({ path: "/catalog/" + movieId.toString() });
  }
}
export default GoToMovie;
