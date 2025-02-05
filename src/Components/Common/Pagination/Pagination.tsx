import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { nextIcon, previousIcon } from "../../../Utils/Icons";
import "./Pagination.scss";

interface IPagination {
  items: Array<any>;
  itemsPerPage: number;
  setCurrentItems: (value: any) => void;
}

const Pagination = (props: IPagination) => {
  const { itemsPerPage = 10, items, setCurrentItems } = props;
  const [itemOffset, setItemOffset] = useState(0);

  //   setCurrentItems(currentItems);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    setCurrentItems(currentItems);
  }, [itemOffset, items]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    items?.length > itemsPerPage && (
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel={nextIcon}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={previousIcon}
        renderOnZeroPageCount={null}
      />
    )
  );
};

export default Pagination;
