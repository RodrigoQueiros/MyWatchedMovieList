import { Component, Vue } from "vue-property-decorator";

@Component
class GoToPage extends Vue {
  public checked: boolean = false;
  public goToPage(page: string): void {
    // Go to any page by name
    this.$router.push({ name: page });
    this.checked = false;
  }
}
export default GoToPage;
