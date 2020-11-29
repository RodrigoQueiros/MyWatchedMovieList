<template>
  <div class="catalog">
    <div class="catalog-space">
      <div>
        <!-- Search inputs -->
        <div class="catalog-box">
          <h2 class="catalog-title">Advanced Search</h2>
          <div class="catalog-search">
            <!-- Search by name -->
            <form class="search-by-name-input">
              <label for="search-by-name" class="search-label">Search for movie name</label>
              <input
                class="search-input"
                type="text"
                placeholder="Search by name"
                name="search-by-name-input"
                id="search-by-name"
                v-model="nameSearch"
                v-on:keyup.enter="getMoviesByName()"
              />
              <div class="flex">
                <button class="button-search" @click="getMoviesByName()">Search</button>
              </div>
            </form>
            <form>
              <!-- Sort by -->
              <div class="search-sorting">
                <label for="search-sorting-input" class="search-label">Sort by</label>
                <select
                  v-model="sortSelected"
                  name="search-sorting-input"
                  id="search-sorting-input"
                  class="select-input"
                >
                  <option disabled value>Select one</option>
                  <option value="popularity.asc">Popularity Asc</option>
                  <option value="popularity.desc">Popularity Desc</option>
                  <option value="original_title.asc">Title Asc</option>
                  <option value="original_title.desc">Title Desc</option>
                  <option value="vote_average.asc">Rating Asc</option>
                  <option value="vote_average.desc">Rating Desc</option>
                  <option value="release_date.asc">Date Asc</option>
                  <option value="release_date.desc">Date Desc</option>
                </select>
              </div>
              <!-- Sort by genre -->
              <div class="search-by-genre">
                <label for="search-genre-input" class="search-label">Genre</label>
                <select
                  v-model="genreSelected"
                  name="search-genre-input"
                  id="search-genre-input"
                  class="select-input"
                >
                  <option value>Not selected</option>
                  <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
                </select>
              </div>
              <!-- Sort by year -->
              <div class="search-by-year">
                <label for="search-year-input" class="search-label">Year</label>
                <input
                  class="search-input"
                  type="text"
                  placeholder="Search by year [1990-2020]"
                  name="search-year-input"
                  id="search-year-input"
                  v-model="yearInput"
                  v-on:keyup.enter="searchMovie()"
                />
              </div>
              <div class="flex">
                <button class="button-search" @click="searchMovie()">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="catalog-box">
        <div class="catalog-header-line">
          <div>
            <h2 class="catalog-title">Catalogue</h2>
          </div>
          <!-- Pagination top -->
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @previous="goToPrevious"
            @go-to="goToPage"
            @next="goToNext"
          />

          <!-- View change -->
          <div class="catalog-views">
            <p class="catalog-views-text">views</p>
            <i
              @click="changeView(0)"
              class="fas fa-bars icon-view"
              :class="viewSelected == 0 ? selected : notSelected"
            ></i>
            <i
              @click="changeView(1)"
              class="fas fa-th icon-view"
              :class="viewSelected == 1 ? selected : notSelected"
            ></i>
          </div>
        </div>
        <!-- Empty state -->
        <div v-if="movies.length == 0">
          <p>No movies found ):</p>
        </div>
        <!-- View 0 cards type 1 -->
        <div class="catlog-cards1" v-if="viewSelected == 0">
          <div v-for="movie in movies" :key="movie.id" @click="goToMovie(movie.id)">
            <Card2 :movie="movie" />
          </div>
        </div>
        <!-- View 1 cards type 2 -->
        <div class="catlog-cards2" v-if="viewSelected == 1">
          <div class="catlog-card" v-for="movie in movies" :key="movie.id">
            <Card :movie="movie" />
          </div>
        </div>
        <!-- Pagination bottom -->
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @previous="goToPrevious"
          @go-to="goToPage"
          @next="goToNext"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TS
import { Component, Vue } from "vue-property-decorator";
// Mixin
import GoToMovie from "../components/mixins/goToMovie";
// Component
import Card from "../components/Card.vue";
import Card2 from "../components/Card2.vue";
import Pagination from "../components/Pagination.vue";
import { MovieModel, GenreModel } from "../store/models/models";

@Component({
  components: {
    Card,
    Card2,
    Pagination
  },
  mixins: [GoToMovie]
})
export default class Catalog extends Vue {
  private searchSelected: number = 0;
  private viewSelected: number = 0;
  private totalPages: number = 50;
  private currentPage: number = 1;
  private sortSelected: string = "popularity.desc";
  private genreSelected: string = "";
  private yearInput: string = "";
  private nameSearch: string = "";
  private genres: GenreModel[] = [];
  private movies: MovieModel[] = [];
  //   Css class
  private selected: string = "view-selected";
  private notSelected: string = "view-not-selected";
  public async created() {
    // Get prefered view
    const local = localStorage.getItem("view");
    if (local) {
      this.viewSelected = parseInt(local);
    }

    //If in categories page genre selected, this will make the catalog be filtered by the selected genre
    if (this.$route.params.value) {
      this.genreSelected = this.$route.params.value;
    }
    // Get movies
    this.getMovies();

    // Get all genres
    await this.$store.dispatch("getAllGenres");
    this.genres = this.$store.state.genres;
  }

  public changeView(changeTo: number): void {
    this.viewSelected = changeTo;
    // Save prefered view
    localStorage.setItem("view", changeTo.toString());
  }

  public async getMoviesByName() {
    //Search state 1-by name, 2-by sort,genre,year
    this.searchSelected = 1;

    //Api request
    const filter = "&query=" + this.nameSearch + "&page=" + this.currentPage;

    await this.$store.dispatch("getMoviesByName", filter);
    this.movies = this.$store.state.catalogMovies;
    this.totalPages = this.$store.state.totalPages;
  }

  public async getMovies() {
    // Query and verifications
    let filter =
      "&sort_by=" +
      this.sortSelected +
      "&page=" +
      this.currentPage +
      "&vote_count.gte=100";

    if (this.genreSelected != "") {
      filter = filter + "&with_genres=" + this.genreSelected;
    }
    if (
      this.yearInput != "" &&
      parseInt(this.yearInput) <= 2020 &&
      parseInt(this.yearInput) >= 1990
    ) {
      filter = filter + "&primary_release_year=" + this.yearInput;
    }

    await this.$store.dispatch("getMoviesAdvancedSearch", filter);
    this.movies = this.$store.state.catalogMovies;
    this.totalPages = this.$store.state.totalPages;
  }

  public searchMovie(): void {
    this.nameSearch = "";
    this.searchSelected = 0;
    this.currentPage = 1;
    this.getMovies();
  }
  // Previous page
  public goToPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      if (this.searchSelected == 0) {
        this.getMovies();
      } else {
        this.getMoviesByName();
      }
    }
  }
  // Next page
  public goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      if (this.searchSelected == 0) {
        this.getMovies();
      } else {
        this.getMoviesByName();
      }
    }
  }
  // If type page number
  public goToPage(page: string): void {
    this.currentPage = parseInt(page);
    if (this.currentPage >= 1 && this.currentPage <= this.totalPages) {
      if (this.searchSelected == 0) {
        this.getMovies();
      } else {
        this.getMoviesByName();
      }
    }
  }
}
</script>

