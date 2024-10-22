import { Tag } from 'antd';
import { Status } from '@/lib/interfaces';
import React from 'react';
const mapStatusToText = (status?: Status) => {
  const elements: JSX.Element[] = [];

  if (status?.isAvailable) {
    elements.push(<Tag color="green">Available</Tag>);
  }
  if (status?.isActive) {
    elements.push(<Tag color="cyan">Active</Tag>);
  }
  if (status?.isFeatured) {
    elements.push(<Tag color="gold">Featured</Tag>);
  }
  // if (status?.featureId) {
  //   elements.push(<Tag color="purple">Feature ID: {status?.featureId}</Tag>);
  // }
  if (status?.needsReview) {
    elements.push(<Tag color="red">Needs Review</Tag>);
  } 

  return elements;
};

export const ProductStatus = ({ status }: { status?: Status }) => {
  const tags = mapStatusToText(status);

  return (
    <>
      {tags.map((tag, index) => (
        <React.Fragment key={index}>
          {tag}
        </React.Fragment>
      ))}
    </>
  );
}

