import { ILog } from '@/lib/interfaces';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Timeline } from 'antd';

type LogsTimelineProps = {
  readonly logs: ILog[];
};

interface ILogWithAction extends ILog {
  action: {
    en: string;
    fr: string;
    [key: string]: string;
  };
}


export default function LogsTimeline({ logs }: LogsTimelineProps) {
  const { i18n } = useTranslation();
  return (
    <div className="p-2">
      {/* <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-4 dark:after:bg-gray-400/20">
        {logs.map((log) => (
          <LogTimelineItem key={log._id} log={log} />
        ))}
      </div> */}

      <Timeline>
        {logs.map((log: ILogWithAction) => {
          return (
            <Timeline.Item key={log._id}>
              <div className="text-md">
                {log?.action[i18n.language] || log.action.en}
              </div>
              <div className="text-gray-500 dark:text-gray-400 flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-[28px] h-[28px]">
                    <AvatarImage src={log?.userAvatar as string} alt="me" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>{' '}
                  <span className='font-bold'>
                    {log.userFirstName} {log.userLastName}
                  </span>
                </div>
                <span>{dayjs(log.createdAt).fromNow()}</span>
              </div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
}
