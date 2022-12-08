import React, { useEffect, useState } from "react";
import {
  ShowFilterType,
  SortByType,
  SortType,
  useStoreProfile,
} from "../../store-filter";

import moment from "moment";

const Table = () => {
  const { setFetchTransaction, filterTransaction, dataFilter, loading } =
    useStoreProfile();
  const [input, setInput] = useState({
    show: "LAST_10_TRX",
    sortBy: "DATE",
    sort: "DESC",
    search: "",
  });

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
    filterTransaction(
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

  useEffect(() => {
    setFetchTransaction();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [input.show, input.sortBy, input.sort, input.search]);

  const renderTable = () => {
    return (
      <>
        <div className="d-flex flex-warp my-4">
          <div className="d-flex flex-fill align-items-center">
            <label className="m-0 me-2" />
            <p>Show</p>
            <select
              onChange={handleChangeSelect}
              defaultValue="LAST_10_TRX"
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
          <div className="mx-1 my-2 d-flex align-items-center">
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
              <option value="AMOUNT">Amount</option>
            </select>
          </div>
          <div className="mx-1 my-2">
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
            <input
              type="text"
              name="search"
              placeholder="Search..."
              onChange={handleChangeInput}
              className="form-control"
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered tabel-hover">
            <thead className="table-head">
              <tr>
                <th scope="col">Date & Time</th>
                <th scope="col">Status</th>
                <th scope="col">From/To</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {dataFilter.map((transactionState) => (
                <tr key={transactionState.id}>
                  <td>{dateFormat(transactionState.date)}</td>
                  <td>
                    {transactionState.status === "INCOME" ? "CREDIT" : "DEBIT"}
                  </td>
                  <td>
                    {transactionState.sender}/{transactionState.recipient}
                  </td>
                  <td>{transactionState.description}</td>
                  <td
                    className={
                      transactionState.status === "INCOME"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {transactionState.status === "INCOME" ? "+ " : "- "}
                    {transactionState.amount}
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

export default Table;
