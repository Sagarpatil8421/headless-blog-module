'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '@/lib/wordpress';
import { selectCategory } from '@/store/categorySlice';
import { Category } from '@/types/blog';

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const selectedCategoryId = useSelector(
    (state: any) => state.category.selectedCategory
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 border-b border-gray-200 pb-6">
      <p className="text-sm font-semibold text-gray-700 mb-3">Filter by Category</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => dispatch(selectCategory(null))}
          aria-pressed={selectedCategoryId === null}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
            selectedCategoryId === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All Posts
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => dispatch(selectCategory(cat.id))}
            aria-pressed={selectedCategoryId === cat.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
              selectedCategoryId === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

