import React from "react";
import PropTypes from "prop-types";

interface Props {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => void;
  handlePrevPage: (page: number) => void;
}
const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="pagination">
      <button
        className="btn btn-info"
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="page-item">
        <button className="btn">Page {currentPage}</button>
      </span>

      <button
        className="btn btn-info"
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
};

export default Pagination;
