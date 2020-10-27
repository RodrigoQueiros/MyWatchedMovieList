import { Component, Vue } from "vue-property-decorator";

@Component
class GoToMovie extends Vue {
  public goToGenre(movieId: number): void {
    const value = movieId.toString();
    this.$router.push({ name: "Catalog", params: { value } });
  }
}
export default GoToMovie;
