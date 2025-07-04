import { GetOtpformData } from "@/app/(user)/auth/_/components/GetOtp";
import http from "./httpService";
import { CompleteProfileFormDataType } from "@/app/(user)/complete-profile/_/components/CompleteProfileForm";
import { ProfileFormDataType } from "@/app/(profile)/profile/_/components/ProfileForm";

export async function getOtpApi(data: GetOtpformData) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export type checkOtpApiPropsType = {
  otp: string;
  phoneNumber: string;
};
export async function checkOtpApi(data: checkOtpApiPropsType) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export async function completeProfileApi(data: CompleteProfileFormDataType) {
  return http
    .post("/user/complete-profile", data)
    .then(({ data }) => data.data);
}

export async function getUserApi() {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export async function updateUserApi(data: ProfileFormDataType) {
  return http.patch("/user/update", data).then(({ data }) => data.data);
}

export async function logoutUserApi() {
  return http.post("/user/logout").then(({ data }) => data.data);
}
