import React from 'react';
import SalesStats from './sales-stats';
import SalesList from './sales-list';
import SaleReview from './sale-review';

type Props = {};

const SalesDashboard = (props: Props) => {
  return (
    <main>
      <SalesStats />
      <div className="grid pt-4 flex-1 items-start gap-4 md:gap-4 lg:grid-cols-3 xl:grid-cols-3">
        <div className="auto-rows-max lg:col-span-2">
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
