import { Cart } from "./User";

export interface UserPayment {
  authority: string;
  cart: Cart;
  createdAt: string;
  amount: number;
  description: string;
  invoiceNumber: string;
  isPaid: boolean;
  paymentDate: string;
  paymentMethod: string;
  status: "COMPLETED" | "UNCOMPLETED";
  updatedAt: string;
  user: string;
  __v: 0;
  _id: string;
}

export interface Payment extends Omit<UserPayment, "user"> {
  user: {
    id: string;
    _id: string;
    phoneNumber: string;
    email: string;
    name: string;
    avatarUrl: null | string;
  };
  createdAt: string;
  updatedAt: string;
}
