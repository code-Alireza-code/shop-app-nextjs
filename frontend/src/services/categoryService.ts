import { AddCategoryDataType } from "@/app/(admin)/admin/categories/_/components/AddCategoryForm";
import http from "./httpService";

export async function getAllCategoriesApi(query = "") {
  return http.get(`/category/list?${query}`).then(({ data }) => data.data);
}

export async function addCategoryApi(data: AddCategoryDataType) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}

export async function getCategoryByIdApi(categoryId: string) {
  return http.get(`/category/${categoryId}`).then(({ data }) => data.data);
}

type editCategoryApiProps = {
  data: AddCategoryDataType;
  id: string;
};

export async function editCategoryApi({ data, id }: editCategoryApiProps) {
  return http
    .patch(`/admin/category/update/${id}`, data)
    .then(({ data }) => data.data);
}

export async function deleteCategoryApi(id: string) {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}
