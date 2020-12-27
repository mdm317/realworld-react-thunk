const token_id = "realworld_token";
export const storeToken = (token: string): void => {
  window.localStorage.setItem(token_id, token);
};
export const destroyToken = (): void => {
  window.localStorage.removeItem(token_id);
};
export const getToken = (): string | null => {
  return window.localStorage.getItem(token_id);
};
