import { Tag } from 'antd';
import React from 'react';
const StatusToText = ({status}:{status?: string}) => {
  let element;

  if (status === 'pending') {
    element = (<Tag color="orange">Pending</Tag>);
  }
  if (status === 'processed') {
    element = (<Tag color="cyan">Processed</Tag>);
  }
  if (status === 'shipped') {
    element = (<Tag color="gold">Shipped</Tag>);
  }
  // if (status?.featureId) {
  //   element = (<Tag color="purple">Feature ID: {status?.featureId}</Tag>);
  // }
  if (status === 'delivered') {
    element = (<Tag color="green">Needs Review</Tag>);
  } 
  if (status === 'canceled') {
    element = (<Tag>Needs Review</Tag>);
  } 

  return element;
};

export const ProductStatus = ({ status }: { status?: string }) => {
  return (
    <>
        <React.Fragment>
          <StatusToText status={status} />
        </React.Fragment>
    </>
  );
}

