import { AddCategoryDataType } from "@/app/(admin)/admin/categories/_/components/AddCategoryForm";
import http from "./httpService";

export async function getAllCategoriesApi(query = "") {
  return http.get(`/category/list?${query}`).then(({ data }) => data.data);
}

export async function addCategoryApi(data: AddCategoryDataType) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}
