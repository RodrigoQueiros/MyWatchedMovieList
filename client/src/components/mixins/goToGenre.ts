import { Component, Vue } from "vue-property-decorator";

@Component
class GoToMovie extends Vue {
  public goToGenre(movieId: number): void {
    // Redirects the user to the catalog page with the selected genre filtered
    const value = movieId.toString();
    this.$router.push({ name: "Catalog", params: { value } });
  }
}
export default GoToMovie;
