import { AddCouponFormDataType } from "@/app/(admin)/admin/coupons/_/components/AddCouponForm";
import http from "./httpService";

export async function getAllCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export async function addCouponApi(data: AddCouponFormDataType) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}
