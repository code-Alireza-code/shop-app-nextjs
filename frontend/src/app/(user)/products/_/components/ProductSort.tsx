import Radio from "@/ui/Radio";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدید ترین",
  },
  {
    id: 2,
    value: "earliest",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];

function ProductSort() {
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || "latest"
  );
  const router = useRouter();

  const handleChangeSort = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === selectedSort) return;
    setSelectedSort(e.target.value);
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params.sort = selectedSort;
    const newSearch = queryString.stringify(params);
    router.replace(`?${newSearch}`);
  }, [selectedSort, router, searchParams]);

  return (
    <div>
      <p className="font-bold mb-4">مرتب سازی</p>
      {sortOptions.map((option) => (
        <Radio
          key={option.id}
          label={option.label}
          value={option.value}
          name="product-sort"
          id={option.id.toString()}
          onChange={handleChangeSort}
          checked={selectedSort === option.value}
        />
      ))}
    </div>
  );
}

export default ProductSort;
