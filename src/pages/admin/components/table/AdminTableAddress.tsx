import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTransactionStore } from "../../../../store";
import {
  ShowFilterType,
  SortByType,
  SortType,
  useStoreAddress,
} from "../../../../store-address";

const AdminTableAddress = () => {
  const transactionState = useTransactionStore((state) => state);
  const navigate = useNavigate();
  const {
    setFetchAddressAdmin,
    addressDatas,
    filterAddressAdmin,
    dataFilter,
    loading,
  } = useStoreAddress();
  const [input, setInput] = useState({
    show: "LAST_10_TRX",
    sortBy: "DATE",
    sort: "DESC",
    search: "",
  });
  console.log(dataFilter, "======================");
  console.log(addressDatas, "1111111111111111");

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
    filterAddressAdmin(
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

  const handleClick = (addressID: number) => {
    transactionState.deleteAddress(addressID);
  };
  const handleClickEdit = (addressID: number) => {
    transactionState.getAddressById(addressID);
  };

  useEffect(() => {
    setFetchAddressAdmin();
  }, []);

  useEffect(() => {
    console.log(transactionState.message, "2e21ui2gi12eu1ieg12eugeuig2u");
    if (transactionState.message === "Deleted") {
      setFetchAddressAdmin();
    }
  }, [transactionState.message]);

  useEffect(() => {
    handleFilter();
  }, [input.show, input.sortBy, input.sort, input.search]);

  const renderTable = () => {
    return (
      <>
        <div className="mx-5 my-5 d-flex flex-warp my-4 sticky-top bg-white">
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
              placeholder="Search by user..."
              onChange={handleChangeInput}
              className="form-control"
            />
          </div>
        </div>
        <div className="mx-5 my-5 table-responsive">
          <table className="table table-striped table-bordered tabel-hover">
            <thead className="table-head">
              <tr>
                <th scope="col">Date & Time</th>
                <th scope="col">User</th>
                <th scope="col">Full Address</th>
                <th scope="col">Recipient Name</th>
                <th scope="col">Recipient Phone Number</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {dataFilter.map((addressState) => (
                <tr key={addressState.id}>
                  <td>{dateFormat(addressState.UpdatedAt)}</td>
                  <td>{addressState.user.name}</td>
                  <td>{addressState.full_address}</td>
                  <td>{addressState.recipient_name}</td>
                  <td>{String(addressState.recipient_phone_number)}</td>
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

export default AdminTableAddress;
