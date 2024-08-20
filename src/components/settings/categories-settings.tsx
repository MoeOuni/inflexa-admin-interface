import React from 'react';
import { CategoriesTable } from '../data-tables/categories-table';
import { CategoryForm } from '../forms/category-form';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { SquarePlus } from 'lucide-react';
import { useCategories } from '@/api';
import { Category } from '@/lib/types';
import { useTranslation } from 'react-i18next';

const CategoriesSettings = () => {
  const { t } = useTranslation();
  const categories = useCategories();
  const [view, setView] = React.useState('table');
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const handleViewChange = () => {
    setView(view === 'table' ? 'form' : 'table');
  };

  const handleEdit = (category?: Category) => {
    setSelectedCategory(category || null);
    if (category) setView('form');
  };

  return (
    <>
      <div className="pb-3">
        {view === 'table' && (
          <div className="justify-between w-full flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1" onClick={handleViewChange}>
              <SquarePlus className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t('category_add_button')}
              </span>
            </Button>
          </div>
        )}
      </div>

      {view !== 'table' ? (
        <CategoryForm
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleChangeView={handleViewChange}
        />
      ) : (
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>{t('categories')}</CardTitle>
            <CardDescription>
              {t('categories_table_description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoriesTable
              data={categories?.data?.data ?? []}
              handleEdit={handleEdit}
              loading={categories.isLoading}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CategoriesSettings;
