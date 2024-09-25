import { useLogs } from '@/api';
import GeneralKpis from '@/components/analytics/general-kpis';
import LogsTimeline from '@/components/app/logs-timeline';
import SalesStats from '@/components/sales/sales-stats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const logs = useLogs();

  return (
    <div>
      <div className="grid gap-4 grid-cols-3">
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Vente KPIS 💰</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesStats />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities 📃</CardTitle>
            </CardHeader>
            <CardContent>
              <LogsTimeline logs={logs?.data?.data?.slice(0, 7) || []} />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>General KPIS 📈</CardTitle>
            </CardHeader>
            <CardContent>
              <GeneralKpis />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
