import { useLogs } from '@/api';
import LogsTimeline from '@/components/app/logs-timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const Logs = () => {
  const logs = useLogs();
  const {t} = useTranslation();

  return (
    <div>
      <div className="grid gap-4 grid-cols-2">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('logs')}</CardTitle>
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

export default Logs;
