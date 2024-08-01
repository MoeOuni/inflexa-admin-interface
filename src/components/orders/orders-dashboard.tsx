import OrderReview from './order-review';
import OrdersList from './orders-list';
import OrdersStats from './orders-stats';

const OrdersDashboard = () => {
  return (
    <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <OrdersStats />
        <OrdersList />
      </div>
      <div>
        <OrderReview />
      </div>
    </main>
  );
};

export default OrdersDashboard;
