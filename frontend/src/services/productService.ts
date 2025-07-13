import http from "./httpService";

export async function getAllProductsApi(query = "") {
  return http.get(`/product/list?${query}`).then(({ data }) => data.data);
}

export async function getProductBySlugApi(slug: string) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}
