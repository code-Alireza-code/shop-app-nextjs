import { Cart } from "./User";

export interface Payment {
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
