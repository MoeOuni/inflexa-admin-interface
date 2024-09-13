import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';

type Props = {
  tooltip?: string;
  title: string;
  value: number;
  unit: string;
  progress: number;
  key: string;
  subtitle: string;
};

const KpiProgressCard = (props: Props) => {
  return (
    <Tooltip >
      <TooltipTrigger asChild>
        <Card x-chunk="dashboard-05-chunk-1" className='cursor-help'>
          <CardHeader className="pb-2">
            <CardDescription>{props?.title}</CardDescription>
            <CardTitle>
              {props?.unit} {props?.value.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground mb-2">
              {props?.subtitle}
            </div>
            <Progress value={props?.progress} aria-label="25% increase" />
          </CardContent>
          
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p className='max-w-[290px]'>{props?.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default KpiProgressCard;
