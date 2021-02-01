export const url = "https://conduit.productionready.io/api";
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}
export interface User {
  createdAt: string;
  updatedAt: string;
  email: string;
  username: string;
  bio: string;
  image: string;
}
export interface LoginUser extends User {
  token: string;
}
export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
export const defaultImage =
  "https://static.productionready.io/images/smiley-cyrus.jpg";
