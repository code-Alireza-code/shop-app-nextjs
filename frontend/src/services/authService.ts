import { GetOtpformData } from "@/app/auth/_/components/GetOtp";
import http from "./httpService";

export async function getOtpApi(data: GetOtpformData) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}
