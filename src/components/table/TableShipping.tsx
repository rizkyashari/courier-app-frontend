import React, { useEffect, useState } from "react";
import {
  ShowFilterType,
  SortByType,
  SortType,
  useStoreProfile,
} from "../../store-shipping";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTransactionStore } from "../../store";
import {
  Badge,
  Notification,
  Wrapper,
} from "../../styled-components/GlobalStyles";
import Pagination from "./Pagination";
import { IShipping } from "../../interface";

const TableShipping = () => {
  const [pages, setPage] = useState(1);
  const [totalPages] = useState(10);

  const handlePrevPage = (prevPage: number) => {
    // console.log(prevPage);
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage);
    setPage((nextPage) => nextPage + 1);
  };

  const transactionState = useTransactionStore((state) => state);
  const navigate = useNavigate();
  const {
    setFetchShipping,
    shippingDatas,
    filterShipping,
    dataFilter,
    loading,
  } = useStoreProfile();
  const [input, setInput] = useState({
    show: "LAST_10_TRX",
    sortBy: "DATE",
    sort: "DESC",
    search: "",
  });
  console.log(dataFilter, "======================");
  console.log(shippingDatas, "1111111111111111");

  const dateFormat = (date: string): string => {
    return moment(date).format("HH:mm - DD MMMM YYYY");
  };

  const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  console.log(input, "e2e2e2e2");

  const handleFilter = () => {
    filterShipping(
      input.show as ShowFilterType,
      input.sortBy as SortByType,
      input.sort as SortType,
      input.search
    );
  };
  const handleChangeSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const handleClick = (shippingID: number) => {
    transactionState.deleteShipping(shippingID);
  };

  useEffect(() => {
    console.log("d2g2g2uegyge2ge1e");
    console.log(pages, "dawiduUDGUIUWBUBBIUBCWB");
    setFetchShipping(pages);
  }, [pages]);

  useEffect(() => {
    console.log(transactionState.message, "2e21ui2gi12eu1ieg12eugeuig2u");
    if (transactionState.message === "Deleted") {
      setFetchShipping(pages);
    }
  }, [transactionState.message]);
  useEffect(() => {
    handleFilter();
  }, [input.show, input.sortBy, input.sort, input.search]);

  const renderTable = () => {
    return (
      <>
        <div className="d-flex flex-warp my-4 shadow-lg p-3 mb-5 bg-body rounded">
          <div className="mx-1 my-2 flex-fill align-items-center">
            <label className="m-0 me-2">Show</label>

            <select
              onChange={handleChangeSelect}
              defaultValue="THIS_MONTH"
              name="show"
              id="show"
              className="form-select"
            >
              <option value="LAST_10_TRX">Last 10 transactions</option>
              <option value="THIS_MONTH">This month</option>
              <option value="LAST_MONTH">Last month</option>
              <option value="THIS_YEAR">This year</option>
              <option value="LAST_YEAR">Last year</option>
            </select>
          </div>
          <div className="mx-1 my-2">
            <label htmlFor="sortBy" className="m-0 me-2">
              Sort By
            </label>
            <select
              name="sortBy"
              id="sortBy"
              className="form-select"
              onChange={handleChangeSelect}
            >
              <option value="DATE">Date</option>
              <option value="SIZE">Size</option>
              <option value="CATEGORY">Category</option>
              <option value="PAYMENT">Payment</option>
              <option value="SHIPPING_STATUS">Shipping Status</option>
            </select>
          </div>
          <div className="mx-1 my-2">
            <label htmlFor="sortBy" className="m-0 me-2">
              Order
            </label>
            <select
              name="sort"
              id="sort"
              className="form-select"
              onChange={handleChangeSelect}
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>
          <div className="mx-1 my-2">
            <label htmlFor="sortBy" className="m-0 me-2">
              Search By Shipping Status
            </label>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              onChange={handleChangeInput}
              className="form-control"
            />
          </div>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={pages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
        <div className="table-responsive shadow-lg p-3 mb-5 bg-body rounded">
          <table className="table table-striped table-bordered tabel-hover">
            <thead className="table-head">
              <tr>
                <th scope="col">Date & Time</th>
                <th scope="col">Size</th>
                <th scope="col">Address</th>
                <th scope="col">Recipient Name</th>
                <th scope="col">Category</th>
                <th scope="col">Add On</th>
                <th scope="col">Shipping Status</th>
                <th scope="col">Payment Status</th>
                <th scope="col d-flex justify-content-center" colSpan={4}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {dataFilter.map((shippingState) => (
                <tr key={shippingState.id}>
                  <td>{dateFormat(shippingState.UpdatedAt)}</td>
                  <td>{shippingState.size.name}</td>
                  <td>{shippingState.address.full_address}</td>
                  <td>{shippingState.address.recipient_name}</td>
                  <td>{shippingState.category.name}</td>
                  <td>{shippingState.add_on.name}</td>
                  {shippingState.shipping_status ==
                  "Package is arrived in destination address: done" ? (
                    <td>
                      <span>
                        <button className="btn btn-success">
                          {shippingState.shipping_status}
                        </button>
                      </span>
                    </td>
                  ) : shippingState.shipping_status == "Waiting for payment" ? (
                    <>
                      <td>
                        <span>
                          <button className="btn btn-danger">
                            {shippingState.shipping_status}
                          </button>
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <span>
                          <button className="btn btn-warning">
                            {shippingState.shipping_status}
                          </button>
                        </span>
                      </td>
                    </>
                  )}

                  <td>{shippingState.payment.payment_status}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate(`/shipping/${shippingState.id}`, {
                          replace: true,
                        });
                      }}
                      className="btn btn-success"
                    >
                      Detail
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleClick(shippingState.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container">{loading ? "loading" : renderTable()}</div>
    </>
  );
};

export default TableShipping;
