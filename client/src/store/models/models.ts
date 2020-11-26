// Movies
export interface MovieModel {
  overview: string;
  title: string;
  poster_path: string;
  runtime: string;
  vote_average: number;
  id: number;
  src: string;
}

export interface BannerModel {
  id: string;
  path: string;
}

// Watch list
export interface WatchModel {
  title: string;
  poster_path: string;
  vote_average: number;
  id: number;
  watchState: string;
}

//  Categories
export interface CategoriesModel {
  name: string;
  id: number;
  img: string;
  color: string;
}

export interface CategoriesImage {
  name: string;
  color: string;
}
