import http from "./httpService";

export async function getAllCategoriesApi(query = "") {
  return http.get(`/category/list?${query}`).then(({ data }) => data.data);
}
