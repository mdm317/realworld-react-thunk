import { deleteArticleAPI } from "../Api/article";

export async function deleteArticle(slug: string): Promise<void> {
  try {
    await deleteArticleAPI(slug);
    return;
  } catch (e) {
    if (e.response.status === 401) {
      throw Error("You need to login!");
    } else {
      throw Error("Try it rater");
    }
  }
}
