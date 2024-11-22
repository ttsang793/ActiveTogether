export default function SimplePage(props) {
  const handlePageChange = (page) => props.handlePageChange(page);

  const numPage = props.page;
  const totalPage = Math.ceil(props.total / props.numPerPage);
  
  if (totalPage === 1) return <></>

  const firstButton = (numPage > 1) ? <button className="at-sbtn-secondary mx-1" onClick={() => handlePageChange(1)}>&lt;</button> : "";
  const lastButton = (numPage < totalPage) ? <button className="at-sbtn-secondary mx-1" onClick={() => handlePageChange(totalPage)}>&gt;</button> : "";

  let pageList = [numPage];
  switch (true) {
    case (numPage === 1): {
      let i = numPage + 1;
      while (i <= totalPage && i <= numPage + 2) pageList.push(i++);
      break;
    }
    case (numPage === totalPage): {
      let i = numPage - 1;
      while (i >= 1 && i >= numPage - 2) pageList.unshift(i--);
      break;
    }
    default: {
      pageList.unshift(numPage - 1);
      pageList.push(numPage + 1);
    }
  }

  return props.page === 0 ? <></> : (
    <div id="page" className="d-flex justify-content-center mt-2">
      {firstButton}
        <button className={`at-sbtn${pageList[0] === numPage ? "" : "-secondary"} mx-1`} onClick={() => handlePageChange(pageList[0])}>{pageList[0]}</button>
        <button className={`at-sbtn${pageList[1] === numPage ? "" : "-secondary"} mx-1`} onClick={() => handlePageChange(pageList[1])}>{pageList[1]}</button>
        { pageList[2] !== undefined && <button className={`at-sbtn${pageList[2] === numPage ? "" : "-secondary"} mx-1`} onClick={() => handlePageChange(pageList[2])}>{pageList[2]}</button> }
      {lastButton}
    </div>
  )
}