import { categories } from '../data';
import CategoryItem from './CategoryItem';

const Categories = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:p-[20px] justify-between ">
      {categories.map((i) => (
        <CategoryItem key={i.id} item={i} />
      ))}
    </div>
  );
};

export default Categories;
