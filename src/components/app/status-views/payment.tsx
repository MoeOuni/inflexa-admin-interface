import { Tag } from 'antd';
import React from 'react';
const StatusToText = ({status}:{status?: string}) => {
  let element;

  if (status === 'cash') {
    element = (<Tag color="orange">Cash</Tag>);
  }
  if (status === 'credit') {
    element = (<Tag color="lime">Credit Card</Tag>);
  }
  if (status === 'debit') {
    element = (<Tag color="green">Debit Card</Tag>);
  }
  // if (status?.featureId) {
  //   element = (<Tag color="purple">Feature ID: {status?.featureId}</Tag>);
  // }
  if (status === 'check') {
    element = (<Tag color="geekblue">Check</Tag>);
  } 
  if (status === 'payment_on_delivery') {
    element = (<Tag>Payment On Delivery</Tag>);
  } 
  if (status === 'other') {
    element = (<Tag>Other</Tag>);
  } 

  return element;
};

export const PaymentStatus = ({ status }: { status?: string }) => {
  return (
    <>
        <React.Fragment>
          <StatusToText status={status} />
        </React.Fragment>
    </>
  );
}

