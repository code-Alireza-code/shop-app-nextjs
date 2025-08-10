import { AddCouponFormDataType } from "@/app/(admin)/admin/coupons/_/components/AddCouponForm";
import http from "./httpService";

export async function getAllCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export async function addCouponApi(data: AddCouponFormDataType) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export async function getCouponByIdApi(couponId: string) {
  return http.get(`/admin/coupon/${couponId}`).then(({ data }) => data.data);
}

type editCouponPropsType = {
  data: AddCouponFormDataType;
  couponId: string;
};
export async function editCouponApi({ data, couponId }: editCouponPropsType) {
  return http
    .patch(`/admin/coupon/update/${couponId}`, data)
    .then(({ data }) => data.data);
}

export async function removeCouponApi(couponId: string) {
  return http
    .delete(`/admin/coupon/remove/${couponId}`)
    .then(({ data }) => data.data);
}
