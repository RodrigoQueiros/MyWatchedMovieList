<template>
  <div class="catalog">
    <div class="catalog-space">
      <div class="catalog-box">
        <h2 class="catalog-title">Advanced Search</h2>
      </div>
      <div class="catalog-box">
        <div class="catalog-header-line">
          <div>
            <h2 class="catalog-title">Catalogue</h2>
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
        <div class="catlog-cards1" v-if="viewSelected == 0">
          <div class="catalog-card1" v-for="movie in movies" :key="movie.id">
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
        <div class="catalog-pagination-line"></div>
        <div>
          <i
            @click="goToPrevious()"
            class="fas fa-arrow-alt-circle-left pagination-icon"
            :style="currentPage==1?{ color: 'grey' }:''"
          ></i>
        </div>
        <div>
          <input type="text" v-model="currentPage" v-on:keyup.enter="goToPage()" />
          <p>/{{totalPages}}</p>
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
</template>

<script lang="ts">
//TS
import { Component, Vue } from "vue-property-decorator";
// Axios
import { getMoviesAdvancedSearch } from "../API/apiDiscover";

type movieType = {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
};

@Component({
  components: {}
})
export default class Catalog extends Vue {
  private viewSelected: number = 0;
  private totalPages: number = 50;
  private currentPage: number = 1;
  private movies: movieType[] = [];
  //   Css class
  private selected: string = "view-selected";
  private notSelected: string = "view-not-selected";
  created() {
    //Get prefered view
    if (localStorage.getItem("view")) {
      this.viewSelected = parseInt(localStorage.getItem("view"));
    }
    this.getMovies("&page=" + this.currentPage);
  }
  public goToMovie(movieId): void {
    //Go to the details page of movie
    this.$router.push({ path: "/catalog/" + movieId });
  }

  public changeView(changeTo): void {
    this.viewSelected = changeTo;
    //Save prefered view
    localStorage.setItem("view", changeTo);
  }

  public getMovies(query: string): void {
    getMoviesAdvancedSearch(query).then(response => {
      this.movies = response.data.results;
      this.totalPages = response.data.total_pages;
      for (let i = 0; i < 20; i++) {
        //Correct the path
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

  public goToPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getMovies("&page=" + this.currentPage);
    }
  }

  public goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.getMovies("&page=" + this.currentPage);
    }
  }

  public goToPage(): void {
    console.log(this.currentPage);
    if (this.currentPage >= 1 && this.currentPage <= this.totalPages) {
      this.getMovies("&page=" + this.currentPage);
    }
  }
}

/*
&sort_by=
popularity.asc
popularity.desc
release_date.asc
release_date.desc
original-title.asc
original-title.desc
vote_average.asc
vote_average.desc
vote_count.asc
vote_count.desc

page=1

with_genres=
id

primary_release_year=

vote_count.gte=100


*/
</script>

