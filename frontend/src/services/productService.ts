import { AddProductDataType } from "@/app/(admin)/admin/products/_/components/AddProductForm";
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

export async function getProdutByIdApi(productId: string) {
  return http.get(`product/${productId}`).then(({ data }) => data.data);
}

type EditProductApiProps = {
  data: AddProductDataType;
  productId: string;
};
export async function editProductApi({ data, productId }: EditProductApiProps) {
  return http
    .patch(`/admin/product/update/${productId}`, data)
    .then(({ data }) => data.data);
}

export async function removeProductApi(productId: string) {
  return http
    .delete(`/admin/product/remove/${productId}`)
    .then(({ data }) => data.data);
}
