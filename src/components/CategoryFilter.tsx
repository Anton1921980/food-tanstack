import { Category } from '../types/recipe';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}


export const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          className={`btn btn-sm ${selectedCategory === null ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onSelectCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.idCategory}
            className={`btn btn-sm ${selectedCategory === category.strCategory ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => onSelectCategory(category.strCategory)}
          >
            {category.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
};
