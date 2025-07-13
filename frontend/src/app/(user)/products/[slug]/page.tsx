import {
  getAllProductsApi,
  getProductBySlugApi,
} from "@/services/productService";
import { BackendError } from "@/types/Error";
import { Product } from "@/types/Product";
import { toPersianNumbersWithComma } from "@/utils/numberFormatter";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const data = await getAllProductsApi();
  const { products }: { products: Product[] } = data || [];

  return products.map((product) => ({ slug: product.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

async function SingleProductPage({ params }: Props) {
  const productSlug = (await params).slug;
  let singleProduct: Product | undefined;
  try {
    const { product }: { product: Product } = await getProductBySlugApi(
      productSlug
    );
    singleProduct = product;
  } catch (error: unknown) {
    console.warn(
      (error as BackendError).response.data.message || "این محصول یافت نشد !"
    );
  }

  if (!singleProduct) notFound();

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">{singleProduct.title}</h1>
      <p className="mb-6">{singleProduct.description}</p>
      <p className="mb-6">
        <span>قیمت محصول : &nbsp;</span>
        <span
          className={`${
            singleProduct.discount === 0 || !singleProduct.discount
              ? "font-bold"
              : "line-through text-gray-500"
          }`}
        >
          {toPersianNumbersWithComma(singleProduct.price)}
        </span>
      </p>
      {singleProduct.discount !== 0 && (
        <div className="flex items-center gap-x-2 mb-6">
          <p className="text-lg font-bold">
            قیمت با تخفیف : {singleProduct.offPrice}
          </p>
          <div className="bg-rose-500 px-2 py-0.5 rounded`-xl text-white text-sm">
            {singleProduct.discount} %
          </div>
        </div>
      )}
      <div>
        <button className="btn btn--primary">افزودن به سبد خرید</button>
      </div>
    </div>
  );
}

export default SingleProductPage;
