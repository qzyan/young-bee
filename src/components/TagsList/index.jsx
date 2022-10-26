/* eslint-disable react/prop-types */
import React from 'react';
import Tag from '../Tag';

export default function TagsList(props) {
  const { tagList, position, setFeedsType, isOutline } = props;
  return (
    <ul className={`tag-list ${position === 'right' ? 'pull-xs-right' : ''}`}>
      {tagList.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          setFeedsType={setFeedsType}
          isOutline={isOutline}
        />
      ))}
    </ul>
  );
}
