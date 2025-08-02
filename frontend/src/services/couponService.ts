import http from "./httpService";

export async function getAllCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}
