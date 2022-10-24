/* eslint-disable react/prop-types */
import React from 'react';

export default function TagsList(props) {
  const { tagList, position } = props;
  return (
    <ul className={`tag-list ${position === 'right' ? 'pull-xs-right' : ''}`}>
      {tagList.map((tag, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span href="/" key={index} className="tag-default tag-pill tag-outline">
          {tag}
        </span>
      ))}
    </ul>
  );
}
