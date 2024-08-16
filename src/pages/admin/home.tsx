import { useLogs } from '@/api';
import LogsTimeline from '@/components/app/logs-timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const logs = useLogs();

  return (
    <div>
      <div className="grid gap-4 grid-cols-2">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities 📃</CardTitle>
            </CardHeader>
            <CardContent>
              <LogsTimeline logs={logs?.data?.data || []} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
