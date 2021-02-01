export interface AddPostApiProp {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
export interface UpdateUserProp {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  image: string | undefined;
  bio: string | undefined;
}
