import React from 'react';
import { CategoryForm } from '@/components/forms/category-form';
import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';
import { Category } from '@/lib/types';
import { useTranslation } from 'react-i18next';
import CategoriesDataTable from '@/components/data-tables/categories/categories-data-table';

const CategoriesSettings = () => {
  const { t } = useTranslation();
  const [view, setView] = React.useState('table');
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const handleViewChange = () => {
    setView(view === 'table' ? 'form' : 'table');
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
        <CategoriesDataTable />
      )}
    </>
  );
};

export default CategoriesSettings;
