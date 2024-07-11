import { Tag } from 'antd';
import React from 'react';
const StatusToText = ({status}:{status?: string}) => {
  let element;

  if (status === 'pending') {
    element = (<Tag color="orange">Pending</Tag>);
  }
  if (status === 'processed') {
    element = (<Tag color="lime">Processed</Tag>);
  }
  if (status === 'shipped') {
    element = (<Tag color="green">Shipped</Tag>);
  }
  // if (status?.featureId) {
  //   element = (<Tag color="purple">Feature ID: {status?.featureId}</Tag>);
  // }
  if (status === 'delivered') {
    element = (<Tag color="geekblue">Delivered</Tag>);
  } 
  if (status === 'cancelled') {
    element = (<Tag>Cancelled</Tag>);
  } 

  return element;
};

export const OrderStatus = ({ status }: { status?: string }) => {
  return (
    <>
        <React.Fragment>
          <StatusToText status={status} />
        </React.Fragment>
    </>
  );
}

