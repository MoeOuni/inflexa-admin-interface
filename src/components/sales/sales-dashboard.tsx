import React from 'react';
import SalesStats from './sales-stats';
import SalesList from './sales-list';
import SaleReview from './sale-review';

type Props = {};

const SalesDashboard = (props: Props) => {
  return (
    <main className="sm:py-0">
      <SalesStats />
      <div className="grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <SalesList />
        </div>
        <div>
          <SaleReview />
        </div>
      </div>
    </main>
  );
};

export default SalesDashboard;
