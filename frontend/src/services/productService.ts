import http from "./httpService";

export async function getAllProductsApi(query = "") {
  return http.get(`/product/list?${query}`).then(({ data }) => data.data);
}
