import React from 'react';

export default function Pages(props) {
  // eslint-disable-next-line react/prop-types
  const { pagesCount, currPage, changeCurrPage } = props;
  return (
    <nav>
      <ul className="pagination">
        {new Array(pagesCount).fill().map((ele, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className={`page-item ${currPage === i + 1 ? 'active' : ''}`} key={i}>
            <a
              onClick={changeCurrPage}
              className="page-link"
              href="/"
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
