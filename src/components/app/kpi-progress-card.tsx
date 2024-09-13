import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>{props?.title}</CardDescription>
            <CardTitle className="text-4xl">
              {props?.unit} {props?.value.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {props?.subtitle}
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={props?.progress} aria-label="25% increase" />
          </CardFooter>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p className='max-w-[290px]'>{props?.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default KpiProgressCard;
