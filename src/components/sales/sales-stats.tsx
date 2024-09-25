import React from 'react';

import KpiProgressCard from '../app/kpi-progress-card';

const SalesStats = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
      <KpiProgressCard
        title="Today"
        value={329}
        unit="$"
        progress={25}
        subtitle="+25% from last day"
        tooltip="Total Sales Revenue Today"
        key="today"
      />
      <KpiProgressCard
        title="This Week"
        value={1329}
        unit="$"
        progress={25}
        subtitle="+25% from last week"
        tooltip="Total Sales Revenue this Week"
        key="week"
      />
      <KpiProgressCard
        title="This Month"
        value={5329}
        unit="$"
        progress={10}
        subtitle="+10% from last month"
        tooltip="Total Sales Revenue this Month"
        key="month"
      />
      <KpiProgressCard
        title="Number of Sales"
        value={29}
        unit="$"
        progress={12}
        subtitle="+10% from last week"
        tooltip="Shows the total number of sales completed during the current week."
        key="month"
      />
      <KpiProgressCard
        title="Sales Conversion Rate"
        value={10}
        unit="%"
        progress={10}
        subtitle="+10% from last month"
        tooltip="Measure the quality of your customer acquisition process and can inform decisions on improving the user journey to drive more conversions."
        key="conversion"
      />
    </div>
  );
};

export default SalesStats;
