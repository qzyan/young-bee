import React from 'react';
import { Link } from 'react-router-dom';

export default function Tag(props) {
  const { tag, setFeedsType, isOutline } = props;

  const handleClick = () => {
    setFeedsType('tag');
  };

  return (
    <Link
      key={tag}
      to={`/home?tag=${tag}`}
      className={`tag-pill tag-default ${isOutline ? 'tag-outline' : ''}`}
      onClick={handleClick}
    >
      {tag}
    </Link>
  );
}
