export default function Pages(props) {
  const { pagesCount, currPage, changeCurrPage } = props
  return (
    <nav>
      <ul className="pagination">
        {new Array(pagesCount).fill().map((ele, i) => (
          <li className={`page-item ${currPage === i + 1 ? 'active' : ''}`} key={i}>
            <a onClick={changeCurrPage} className="page-link" href="">{i + 1}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}