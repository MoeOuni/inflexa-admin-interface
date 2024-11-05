import { useLogs } from '@/api';
import GeneralKpis from '@/components/modules/analytics/general-kpis';
import LogsTimeline from '@/components/app/logs-timeline';
import SalesStats from '@/components/modules/sales/sales-stats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const logs = useLogs({
    pagination: {
      pageIndex: 0,
      pageSize: 7,
    },
  });

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
              <CardTitle className="flex gap-3 items-center">
                Recent Activities 📃{' '}
                {logs?.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              {logs?.isPending ? (
                <div className="grid gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="grid gap-2">
                      <Skeleton className="h-6 w-2/3" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/6" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <LogsTimeline logs={logs?.data?.data?.data || []} />
                  <Button
                    variant={'secondary'}
                    onClick={() => {
                      navigate('/logs?pageIndex=1&pageSize=10');
                    }}
                  >
                    View All Activities
                  </Button>
                </div>
              )}
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
