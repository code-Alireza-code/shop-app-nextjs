export interface Category {
  icon: {
    sm: null | string;
    lg: null | string;
  };
  _id: string;
  title: string;
  englishTitle: string;
  description: string;
  type: string;
  parentId: null | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
