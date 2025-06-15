import { GetOtpformData } from "@/app/auth/_/components/GetOtp";
import http from "./httpService";
import { CompleteProfileFormDataType } from "@/app/complete-profile/_/components/CompleteProfileForm";

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
