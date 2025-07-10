"use client";

import { Category } from "@/types/Category";
import CheckBox from "@/ui/Checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  categories: Category[];
};

function CategorySidebar({ categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categoryParams, setCategoryParams] = useState<string[]>(() => {
    const param = searchParams.get("category");
    return param ? param.split(",") : [];
  });

  const handleChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCategoryParams((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  useEffect(() => {
    const current = Object.fromEntries(searchParams.entries());
    if (categoryParams.length > 0) {
      current.category = categoryParams.join(",");
    } else {
      delete current.category;
    }
    const newQuery = queryString.stringify(current);
    router.replace(`?${newQuery}`);
  }, [categoryParams, router, searchParams]);

  return (
    <div className="col-span-1">
      <p className="font-bold mb-4">دسته بندی ها</p>
      <ul className="col-span-1 space-y-4">
        {categories?.map((category) => (
          <li key={category._id}>
            <CheckBox
              checked={categoryParams.includes(category.englishTitle)}
              label={category.title}
              name={category.englishTitle}
              onChange={handleChangeCategory}
              value={category.englishTitle}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySidebar;
