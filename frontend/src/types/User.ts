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
