import { Suspense } from "react";
import ProfileForm from "../_/components/ProfileForm";
import Loading from "@/ui/Loading";

function page() {
  return (
    <div>
      <h1 className="font-semibold text-lg">اطلاعات کاربری</h1>
      <Suspense fallback={<Loading />}>
        <ProfileForm />
      </Suspense>
    </div>
  );
}

export default page;
