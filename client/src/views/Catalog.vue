<template>
  <div class="catalog">
    <div class="catalog-space">
      <div>
        <div class="catalog-box">
          <h2 class="catalog-title">Advanced Search</h2>
          <div class="catalog-search">
            <div class="search-by-name-input">
              <label for="search-by-name" class="search-label">Search for movie name</label>
              <input
                class="search-input"
                type="text"
                placeholder="Search by name"
                name="search-by-name-input"
                v-model="nameSearch"
                v-on:keyup.enter="getMoviesByName()"
              />
              <button class="button-search" @click="getMoviesByName()">Search</button>
            </div>
            <div class="search-sorting">
              <label for="search-sorting-input" class="search-label">Sort by</label>
              <select v-model="sortSelected" name="search-sorting-input" class="select-input">
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
            <div class="search-by-genre">
              <label for="search-genre-input" class="search-label">Genre</label>
              <select v-model="genreSelected" name="search-genre-input" class="select-input">
                <option value>Not selected</option>
                <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{genre.name}}</option>
              </select>
            </div>
            <div class="search-by-year">
              <label for="search-year-input" class="search-label">Year</label>
              <input
                class="search-input"
                type="text"
                placeholder="Search by year [1990-2020]"
                name="search-year-input"
                v-model="yearInput"
                v-on:keyup.enter="searchMovie()"
              />
            </div>
            <button class="button-search" @click="searchMovie()">Search</button>
          </div>
        </div>
      </div>
      <div class="catalog-box">
        <div class="catalog-header-line">
          <div>
            <h2 class="catalog-title">Catalogue</h2>
          </div>

          <div class="catalog-pagination-line">
            <div>
              <i
                @click="goToPrevious()"
                class="fas fa-arrow-alt-circle-left pagination-icon"
                :style="currentPage==1?{ color: 'grey' }:''"
              ></i>
            </div>
            <div class="pagination-flex">
              <input
                class="paginatin-input"
                type="text"
                v-model="currentPage"
                v-on:keyup.enter="goToPage()"
              />
              <p class="pagination-text">/{{totalPages}}</p>
            </div>
            <div>
              <i
                @click="goToNext()"
                class="fas fa-arrow-alt-circle-right pagination-icon"
                :style="currentPage==totalPages?{ color: 'grey' }:''"
              ></i>
            </div>
          </div>

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
        <div v-if="movies.length == 0">
          <p>No movies found ):</p>
        </div>
        <div class="catlog-cards1" v-if="viewSelected == 0">
          <div
            class="catalog-card1"
            v-for="movie in movies"
            :key="movie.id"
            @click="goToMovie(movie.id)"
          >
            <div class="catalog-card1-img-space">
              <img :src="movie.poster_path" alt />
            </div>
            <div class="catalog-card1-info-space">
              <h2>{{movie.title}}</h2>
              <p class="catalog-card1-info-text">
                <b>Overview:</b>
                {{movie.overview}}
              </p>
            </div>
          </div>
        </div>
        <div class="catlog-cards2" v-if="viewSelected == 1">
          <div class="catlog-card" v-for="movie in movies" :key="movie.id">
            <div @click="goToMovie(movie.id)">
              <div class="movie-card-info">
                <img class="catalog-card-image" :src="movie.poster_path" alt />
                <div class="overlay">
                  <p class="text-overlay">rating: {{movie.vote_average}}</p>
                  <p class="text-overlay">{{movie.release_date}}</p>
                </div>
              </div>
              <h2 class="movie-card-title">{{movie.title}}</h2>
            </div>
          </div>
        </div>
        <div class="catalog-pagination-line">
          <div>
            <i
              @click="goToPrevious()"
              class="fas fa-arrow-alt-circle-left pagination-icon"
              :style="currentPage==1?{ color: 'grey' }:''"
            ></i>
          </div>
          <div class="pagination-flex">
            <input
              class="paginatin-input"
              type="text"
              v-model="currentPage"
              v-on:keyup.enter="goToPage()"
            />
            <p class="pagination-text">/{{totalPages}}</p>
          </div>
          <div>
            <i
              @click="goToNext()"
              class="fas fa-arrow-alt-circle-right pagination-icon"
              :style="currentPage==totalPages?{ color: 'grey' }:''"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TS
import { Component, Vue } from "vue-property-decorator";
// Axios
import { getMoviesAdvancedSearch, getMoviesByName } from "../API/apiDiscover";
import { getAllGenres } from "../API/apiGenre";
// Mixin
import GoToMovie from "../components/mixins/goToMovie";

interface movieType {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
}

interface genreType {
  name: string;
  id: number;
}

@Component({
  components: {},
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
  private genres: genreType[] = [];
  private movies: movieType[] = [];
  //   Css class
  private selected: string = "view-selected";
  private notSelected: string = "view-not-selected";
  public created() {
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
    getAllGenres().then(response => {
      this.genres = response.data.genres;
    });
  }

  public changeView(changeTo: number): void {
    this.viewSelected = changeTo;
    // Save prefered view
    localStorage.setItem("view", changeTo.toString());
  }

  public getMoviesByName(): void {
    //Search state 1-by name, 2-by sort,genre,year
    this.searchSelected = 1;

    //Api request
    const query = "&query=" + this.nameSearch + "&page=" + this.currentPage;
    console.log(query);
    getMoviesByName(query).then(response => {
      this.movies = response.data.results;
      this.totalPages = response.data.total_pages;

      for (let i = 0; i < 20; i++) {
        // Correct the path
        this.movies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" + this.movies[i].poster_path;

        //If overview length to big, reduce it
        if (this.movies[i].overview.length >= 300) {
          this.movies[i].overview =
            this.movies[i].overview.substr(0, 300) + "...";
        }
        //If title length to big, reduce it
        if (this.movies[i].title.length >= 32) {
          this.movies[i].title = this.movies[i].title.substr(0, 32) + "...";
        }
      }
    });
  }

  public getMovies(): void {
    let query =
      "&sort_by=" +
      this.sortSelected +
      "&page=" +
      this.currentPage +
      "&vote_count.gte=100";

    if (this.genreSelected != "") {
      query = query + "&with_genres=" + this.genreSelected;
    }
    if (
      this.yearInput != "" &&
      parseInt(this.yearInput) <= 2020 &&
      parseInt(this.yearInput) >= 1990
    ) {
      query = query + "&primary_release_year=" + this.yearInput;
    }

    //Api request
    getMoviesAdvancedSearch(query).then(response => {
      this.movies = response.data.results;
      this.totalPages = response.data.total_pages;
      for (let i = 0; i < 20; i++) {
        // Correct the path
        this.movies[i].poster_path =
          "https://image.tmdb.org/t/p/w500" + this.movies[i].poster_path;

        if (this.movies[i].overview.length >= 300) {
          this.movies[i].overview =
            this.movies[i].overview.substr(0, 300) + "...";
        }

        if (this.movies[i].title.length >= 32) {
          this.movies[i].title = this.movies[i].title.substr(0, 32) + "...";
        }
      }

      console.log(response.data);
    });
  }

  public searchMovie(): void {
    this.nameSearch = "";
    this.searchSelected = 0;
    this.currentPage = 1;
    this.getMovies();
  }

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

  public goToPage(): void {
    console.log(this.currentPage);
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

