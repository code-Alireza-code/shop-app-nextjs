export interface User {
  _id: string;
  biography: string | null;
  likedProducts: []; //! should be edited...
  phoneNumber: string;
  resetLink: null;
  isVerifiedPhoneNumber: boolean;
  isActive: boolean;
  Products: []; //! should be edited...;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
  __v: 0;
  email?: string;
  name?: string;
  avatarUrl: null | string;
}

interface ProductDetail {
  _id: string;
  title: string;
  slug: string;
  imageLink: string;
  price: number;
  offPrice: number;
  discount: number;
  quantity: number;
}

interface OrderItem {
  price: number;
  product: string;
}

interface PayDetail {
  totalOffAmount: number;
  totalPrice: number;
  totalGrossPrice: number;
  orderItems: OrderItem[] | [];
  productIds: string[] | [];
  description: string;
}

export interface Cart {
  _id: "6849c00a6bd2bba2f3230951";
  productDetail: ProductDetail[] | [];
  payDetail: PayDetail;
  coupon: null | string;
}
