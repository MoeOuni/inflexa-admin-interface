import OrderReview from '@/components/orders/order-review';
import OrdersList from '@/components/orders/orders-list';
import OrdersStats from '@/components/orders/orders-stats';

const Orders = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
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

export default Orders;
