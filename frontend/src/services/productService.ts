import { AddProductDataType } from "@/app/(admin)/admin/_/components/AddProductForm";
import http from "./httpService";

export async function getAllProductsApi(query = "") {
  return http.get(`/product/list?${query}`).then(({ data }) => data.data);
}

export async function getProductBySlugApi(slug: string) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export async function likeProductApi(productId: string) {
  return http.post(`/product/like/${productId}`).then(({ data }) => data.data);
}

export async function addProductApi(data: AddProductDataType) {
  return http.post("/admin/product/add", data).then(({ data }) => data.data);
}
