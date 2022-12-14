import React, { useEffect, useState } from "react";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  ShowFilterType,
  SortByType,
  SortType,
  useStoreProfile,
} from "../../../../store-shipping";
import groupBy from "lodash.groupby";

const AdminTableEarningReports = () => {
  const [pages, setPage] = useState(1);
  const [totalPages] = useState(10);

  const navigate = useNavigate();
  const {
    setFetchPayment,
    paymentDatas,
    setFetchShippingAdmin,
    shippingDatas,
    filterShippingAdmin,
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
    filterShippingAdmin(
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
    console.log("d2g2g2uegyge2ge1e");
    setFetchShippingAdmin(pages);
    setFetchPayment();
  }, [pages]);

  //   console.log(paymentDatas, "======================================");
  //   console.log(shippingDatas, "======================================");
  useEffect(() => {
    handleFilter();
  }, [input.show, input.sortBy, input.sort, input.search]);

  const sumOfTotalPayment = dataFilter.reduce((sum, currentValue) => {
    return sum + currentValue.payment.total_cost;
  }, 0);

  console.log(sumOfTotalPayment);

  const renderTable = () => {
    return (
      <>
        <div className="mx-5 my-5 col h-sm-100 d-flex flex-column flex-lg-row flex-wrap my-4 sticky-top bg-white">
          <div className="mx-1 my-2 flex-fill align-items-center">
            <label className="m-0 me-2">Label</label>
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
          <div className="mx-1 my-2 ">
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
              Search By User
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
        <div className="card mx-5 my-5">
          <h4 className="card-header text-center">Total Earnings</h4>
          <div className="card-body">
            <h1 className="card-text text-center">
              IDR {Intl.NumberFormat("id-ID").format(sumOfTotalPayment)}
            </h1>
          </div>
        </div>
        <div className="mx-5 my-5 table-responsive">
          <table className="table table-striped table-bordered tabel-hover">
            <thead className="table-head">
              <tr>
                <th scope="col">Date & Time</th>
                <th scope="col">User</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Total Payment</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {dataFilter.map((shippingState) => (
                <tr key={shippingState.id}>
                  <td>{dateFormat(shippingState.UpdatedAt)}</td>
                  <td>{shippingState.user.name}</td>
                  <td>{shippingState.payment.payment_status}</td>
                  <td>
                    IDR{" "}
                    {Intl.NumberFormat("id-ID").format(
                      shippingState.payment.total_cost
                    )}
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
      <div className="container col flex-column h-sm-100">
        {loading ? "loading" : renderTable()}
      </div>
    </>
  );
};

export default AdminTableEarningReports;
