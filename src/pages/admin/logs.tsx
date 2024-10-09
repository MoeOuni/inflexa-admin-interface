import { useLogs } from '@/api';
import LogsTimeline from '@/components/app/logs-timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useUrlState from '@ahooksjs/use-url-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

const Logs = () => {
  const [pagination, setPagination] = useUrlState<{
    pageIndex: number;
    pageSize: number;
  }>({
    pageIndex: 1,
    pageSize: 10,
  });
  const logs = useLogs({
    pagination: {
      pageIndex: Number(pagination.pageIndex),
      pageSize: Number(pagination.pageSize),
    },
  });

  const { t } = useTranslation();

  return (
    <div>
      <div className="grid gap-4 grid-cols-2">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className='flex gap-3 items-center'>{t('logs')} {logs?.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}</CardTitle>
            </CardHeader>
            <CardContent>
              {logs?.isPending ? (
                <div className='grid gap-4'>
                  {Array.from({ length: 7 }).map((_, index) => (
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
                <LogsTimeline logs={logs?.data?.data?.data || []} />
              )}
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      aria-disabled={
                        Number(pagination?.pageIndex) === 1 ? 'true' : 'false'
                      }
                      className={
                        Number(pagination?.pageIndex) === 1
                          ? 'pointer-events-none opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      }
                      onClick={() => {
                        setPagination({
                          pageIndex: Number(pagination.pageIndex) - 1,
                          pageSize: pagination.pageSize,
                        });
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      aria-disabled={
                        Number(pagination?.pageIndex) ===
                        Number(logs.data?.headers['x-total-pages'])
                          ? 'true'
                          : 'false'
                      }
                      className={
                        Number(pagination?.pageIndex) ===
                        Number(logs.data?.headers['x-total-pages'])
                          ? 'pointer-events-none opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      }
                      onClick={() => {
                        setPagination({
                          pageIndex: Number(pagination.pageIndex) + 1,
                          pageSize: pagination.pageSize,
                        });
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Logs;
