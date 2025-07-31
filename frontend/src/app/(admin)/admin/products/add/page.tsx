import { Suspense } from "react";
import AddProductForm from "../_/components/AddProductForm";
import Loading from "@/ui/Loading";

function page() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <AddProductForm />
      </Suspense>
    </div>
  );
}

export default page;
