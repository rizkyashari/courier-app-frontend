import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTransactionStore } from "../../../../store";
import {
  ShowFilterType,
  SortByType,
  SortType,
  useStorePromo,
} from "../../../../store-promo";

const AdminTablePromo = () => {
  const transactionState = useTransactionStore((state) => state);
  const navigate = useNavigate();
  const { setFetchPromo, promoDatas, filterPromo, dataFilter, loading } =
    useStorePromo();
  const [input, setInput] = useState({
    show: "LAST_10_TRX",
    sortBy: "DATE",
    sort: "DESC",
    search: "",
  });
  console.log(dataFilter, "======================");

  const dateFormat = (date: string): string => {
    return moment(date).format("HH:mm - DD MMMM YYYY");
  };

  const handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleFilter = () => {
    filterPromo(
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
    setFetchPromo();
  }, []);

  useEffect(() => {
    console.log(transactionState.message, "2e21ui2gi12eu1ieg12eugeuig2u");
    if (transactionState.message === "Deleted") {
      setFetchPromo();
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
              <option value="DATE">Exp. Date</option>
              <option value="QUOTA">Quota</option>
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
              Search By Name
            </label>
            <input
              type="text"
              name="search"
              placeholder="Search by promo name..."
              onChange={handleChangeInput}
              className="form-control"
            />
          </div>
        </div>
        <div className="mx-5 my-5 table-responsive">
          <table className="table table-striped table-bordered tabel-hover">
            <thead className="table-head">
              <tr>
                <th scope="col">Date & Time Created</th>
                <th scope="col">Name</th>
                <th scope="col">Minimum Fee</th>
                <th scope="col">Maximum Discount</th>
                <th scope="col">Discount</th>
                <th scope="col">Quota</th>
                <th scope="col">Exp. Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-body">
              {dataFilter.map((promoState) => (
                <tr key={promoState.id}>
                  <td>{dateFormat(promoState.UpdatedAt)}</td>
                  <td>{promoState.name}</td>
                  <td>
                    IDR {Intl.NumberFormat("id-ID").format(promoState.min_fee)}
                  </td>
                  <td>
                    IDR{" "}
                    {Intl.NumberFormat("id-ID").format(promoState.max_discount)}
                  </td>
                  <td>{promoState.discount}%</td>
                  <td>{promoState.quota}</td>
                  <td>{dateFormat(promoState.exp_date)}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate(`/admin/promo/${promoState.id}`, {
                          replace: true,
                        });
                      }}
                      className="btn btn-success"
                    >
                      Detail
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
      <div className="container col flex-column h-sm-100">
        {loading ? "loading" : renderTable()}
      </div>
    </>
  );
};

export default AdminTablePromo;
