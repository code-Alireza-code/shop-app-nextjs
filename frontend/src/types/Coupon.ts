export interface Coupon {
  _id: string;
  code: string;
  type: "fixedPrice" | "percent";
  amount: number;
  expireDate: string;
  isActive: boolean;
  usageCount: number;
  usageLimit: number;
  productIds: {
    _id: string;
    title: string;
    slug: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
