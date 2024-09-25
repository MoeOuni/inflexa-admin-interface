import { ILog } from '@/lib/interfaces';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Timeline } from 'antd';

type LogsTimelineProps = {
  logs: ILog[];
};

interface ILogWithAction extends ILog {
  action: {
    en: string;
    fr: string;
    [key: string]: string;
  };
}

const LogTimelineItem = ({ log }: { log: ILogWithAction }) => {
  const { i18n } = useTranslation();
  return (
    <div className="grid gap-1 text-sm relative border-b pb-2">
      <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 " />
      <div className="text-md font-bold">
        {log.action[i18n.language] || log.action.en}
      </div>
      <div className="text-gray-500 dark:text-gray-400 flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-[28px] h-[28px]">
            <AvatarImage src={log?.userAvatar as string} alt="me" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>{' '}
          <span>
            {log.userFirstName} {log.userLastName}
          </span>
        </div>
        <span>{dayjs(log.createdAt).fromNow()}</span>
      </div>
    </div>
  );
};

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
