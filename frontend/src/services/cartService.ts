import http from "./httpService";

export async function addToCartApi(productId: string) {
  return http.post("/cart/add", { productId }).then(({ data }) => data.data);
}

export async function removeFromCartApi(productId: string) {
  return http.post("/cart/remove", { productId }).then(({ data }) => data.data);
}
