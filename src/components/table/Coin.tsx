import axios from "axios";
import moment from "moment";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTransactionStore } from "../../store";
import {
  ShowFilterType,
  SortByType,
  SortType,
  useStoreProfile,
} from "../../store-shipping";
import { IShipping } from "./interface";
import Pagination from "./Pagination";

const Coin: React.FC = () => {
  const moment = require("moment");
  const showFilter = (
    typeFilter: ShowFilterType,

    dataTrx: IShipping[]
  ): IShipping[] => {
    let result: IShipping[] = [];

    switch (typeFilter) {
      case ShowFilterType.LAST_10_TRX:
        result = dataTrx
          .sort(
            (a, b) =>
              moment(b.updated_at).format("x") -
              moment(a.updated_at).format("x")
          )
          .slice(0, 10);
        return result;

      case ShowFilterType.THIS_MONTH:
        const currentMonth = Number(moment().month()) + 1;
        result = dataTrx.filter(
          (trx) =>
            moment(trx.updated_at).format("M") == currentMonth &&
            moment(trx.updated_at).format("Y") == Number(moment().year())
        );
        return result;

      case ShowFilterType.LAST_MONTH:
        result = dataTrx.filter(
          (trx) =>
            moment(trx.updated_at).format("M") == Number(moment().month()) &&
            moment(trx.updated_at).format("Y") == Number(moment().year())
        );

        return result;

      case ShowFilterType.THIS_YEAR:
        const currentYear = Number(moment().year());

        result = dataTrx.filter(
          (trx) => moment(trx.updated_at).format("Y") == currentYear
        );

        return result;

      case ShowFilterType.LAST_YEAR:
        const lastYear = Number(moment().year()) - 1;

        result = dataTrx.filter(
          (trx) => moment(trx.updated_at).format("Y") == lastYear
        );

        return result;

      default:
        return result;
    }
  };

  const sortBy = (
    sortByType: SortByType,

    sortType: SortType,

    dataTrx: IShipping[]
  ): IShipping[] => {
    let result: IShipping[] = [];

    switch (sortByType) {
      case SortByType.DATE:
        result = dataTrx.sort((a, b) => {
          if (sortType === SortType.ASC) {
            return (
              moment(a.updated_at).format("x") -
              moment(b.updated_at).format("x")
            );
          }

          return (
            moment(b.updated_at).format("x") - moment(a.updated_at).format("x")
          );
        });

        return result;

      default:
        return result;
    }
  };

  const searchDescription = (
    search: string,

    dataTrx: IShipping[]
  ): IShipping[] => {
    let result = dataTrx.filter((trx) =>
      trx.shipping_status
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    );

    return result;
  };

  const searchUser = (
    search: string,

    dataTrx: IShipping[]
  ): IShipping[] => {
    let result = dataTrx.filter((trx) =>
      trx.user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    return result;
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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [coinsData, setCoinsData] = useState<IShipping[]>([]);

  const handlePrevPage = (prevPage: number) => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage);
    setPage((nextPage) => nextPage + 1);
  };

  useEffect(() => {
    console.log("effct");
    let token = localStorage.getItem("id_token");
    const fetchData = async () => {
      console.log(localStorage.getItem("id_token"));
      let requestInstance = axios.create({
        headers: {
          Authorization: `${token}`,
        },
      });
      try {
        const response = await requestInstance.get(
          `http://localhost:8080/api/user/shipping?page=${page}`
        );
        setCoinsData(response.data.data.data);
        // setTotalPages(totalPages);
        console.log(
          response.data.data.data,
          "111111111111111111111111111111111111111111"
        );
      } catch (error) {
        console.log(error);
      }
    };
    console.log(
      coinsData,
      "===================================================="
    );

    if (transactionState.message === "Deleted") {
      fetchData();
    }
    fetchData();
  }, [page]);

  const dateFormat = (date: string): string => {
    return moment(date).format("HH:mm - DD MMMM YYYY");
  };

  const [input, setInput] = useState({
    show: "LAST_10_TRX",
    sortBy: "DATE",
    sort: "DESC",
    search: "",
  });
  console.log(dataFilter, "======================");
  console.log(shippingDatas, "1111111111111111");

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
    setFetchShipping(page);
  }, []);

  useEffect(() => {
    console.log(transactionState.message, "2e21ui2gi12eu1ieg12eugeuig2u");
    if (transactionState.message === "Deleted") {
      setFetchShipping(page);
    }
  }, [transactionState.message]);
  useEffect(() => {
    handleFilter();
  }, [input.show, input.sortBy, input.sort, input.search]);
  return (
    <>
      <div className="d-flex flex-warp my-4 shadow-lg p-3 mb-5 bg-body rounded">
        <div className="mx-1 my-2 flex-fill align-items-center">
          <label className="m-0 me-2">Show</label>

          <select
            // onChange={handleChangeSelect}
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
        currentPage={page}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      <div className="table-responsive shadow-lg p-3 mb-5 bg-body rounded">
        <table
          className="table table-striped table-bordered tabel-hover"
          width="80%"
        >
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
            {coinsData.map((shippingState) => {
              return (
                <tr id={String(shippingState.id)} key={shippingState.id}>
                  <td>{dateFormat(shippingState.updated_at)}</td>
                  <td>{shippingState.size.name}</td>
                  <td>{shippingState.address.full_address}</td>
                  <td>{shippingState.address.recipient_name}</td>
                  <td>{shippingState.category.name}</td>
                  <td>{shippingState.add_on.name}</td>
                  {shippingState.shipping_status ==
                  "Package is arrived in destination address: done" ? (
                    <td className="text-success">
                      {shippingState.shipping_status}
                    </td>
                  ) : (
                    <td>{shippingState.shipping_status}</td>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Coin;
