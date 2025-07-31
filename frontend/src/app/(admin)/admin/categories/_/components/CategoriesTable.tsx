import { categoryListTableTHeads } from "@/constants/tableHeads";
import { Category } from "@/types/Category";
import CategoryActions from "./CategoryActions";

type Props = {
  categories: Category[];
};

function CategoriesTable({ categories }: Props) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {categoryListTableTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td className="table__td">{index + 1}</td>
              <td className="table__td whitespace-nowrap font-bold">
                {category.title}
              </td>
              <td className="table__td">{category.description}</td>
              <td className="table__td">{category.englishTitle}</td>
              <td className="table__td">
                <span className="badge badge--secondary">{category.type}</span>
              </td>
              <td className="table__td">
                <CategoryActions category={category} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesTable;
