// @ts-ignore
import React from 'react';
import KpiProgressCard from '@/components/app/kpi-progress-card';


const GeneralKpis = () => {
  return (
    <div className="grid gap-4 grid-col-1">
      <KpiProgressCard
        title="Today's Orders"
        value={11}
        unit=""
        progress={25}
        subtitle="+25% from last day"
        tooltip="Total Number of orders Today"
        key="today"
      />
      <KpiProgressCard
        title="This week Orders"
        value={11}
        unit=""
        progress={25}
        subtitle="+25% from last week"
        tooltip="Total Number of orders this Week"
        key="week"
      />
      <KpiProgressCard
        title="This week Orders"
        value={24}
        unit=""
        progress={12}
        subtitle="+12% from last week"
        tooltip="Total Number of orders this Week"
        key="week"
      />
      <KpiProgressCard
        title="This week clients"
        value={15}
        unit=""
        progress={5}
        subtitle="+5% from last week"
        tooltip="Total Number of clients this Week"
        key="week"
      />
    </div>
  );
};

export default GeneralKpis;
