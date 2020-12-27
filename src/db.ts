export const url = "https://conduit.productionready.io/api";
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: [string];
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
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  username: string;
  bio: string;
  image: boolean;
}
export interface LoginUser extends User {
  token: string;
}
