import axios from "axios";
import create from "zustand";
import { IProfiles } from "./interface";
import { ITransactions } from "./interface";
import { ITransactionPaginate, IUser } from "./interface";
const moment = require("moment");

let token = localStorage.getItem("id_token");

export enum ShowFilterType {
  LAST_10_TRX = "LAST_10_TRX",
  THIS_MONTH = "THIS_MONTH",
  LAST_MONTH = "LAST_MONTH",
  THIS_YEAR = "THIS_YEAR",
  LAST_YEAR = "LAST_YEAR",
}

export enum SortByType {
  AMOUNT = "AMOUNT",
  DATE = "DATE",
}

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

const showFilter = (
  typeFilter: ShowFilterType,

  dataTrx: ITransactions[]
): ITransactions[] => {
  let result: ITransactions[] = [];

  switch (typeFilter) {
    case ShowFilterType.LAST_10_TRX:
      result = dataTrx
        .sort((a, b) => moment(b.date).format("x") - moment(a.date).format("x"))
        .slice(0, 10);
      return result;

    case ShowFilterType.THIS_MONTH:
      const currentMonth = Number(moment().month()) + 1;
      result = dataTrx.filter(
        (trx) =>
          moment(trx.date).format("M") == currentMonth &&
          moment(trx.date).format("Y") == Number(moment().year())
      );
      return result;

    case ShowFilterType.LAST_MONTH:
      result = dataTrx.filter(
        (trx) =>
          moment(trx.date).format("M") == Number(moment().month()) &&
          moment(trx.date).format("Y") == Number(moment().year())
      );

      return result;

    case ShowFilterType.THIS_YEAR:
      const currentYear = Number(moment().year());

      result = dataTrx.filter(
        (trx) => moment(trx.date).format("Y") == currentYear
      );

      return result;

    case ShowFilterType.LAST_YEAR:
      const lastYear = Number(moment().year()) - 1;

      result = dataTrx.filter(
        (trx) => moment(trx.date).format("Y") == lastYear
      );

      return result;

    default:
      return result;
  }
};

const sortBy = (
  sortByType: SortByType,

  sortType: SortType,

  dataTrx: ITransactions[]
): ITransactions[] => {
  let result: ITransactions[] = [];

  switch (sortByType) {
    case SortByType.AMOUNT:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return a.amount - b.amount;
        }

        return b.amount - a.amount;
      });

      return result;

    case SortByType.DATE:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return moment(a.date).format("x") - moment(b.date).format("x");
        }

        return moment(b.date).format("x") - moment(a.date).format("x");
      });

      return result;

    default:
      return result;
  }
};

const searchDescription = (
  search: string,

  dataTrx: ITransactions[]
): ITransactions[] => {
  let result = dataTrx.filter((trx) =>
    trx.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return result;
};

interface TransactionState {
  userData: IProfiles;
  transactionDatas: ITransactionPaginate;
  dataFilter: ITransactions[];
  loading: boolean;
  error: boolean;
  message: string;
  setUser: (data: IProfiles) => void;
  setFetchTransaction: () => void;
  filterTransaction: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => void;
}

export const useStoreProfile = create<TransactionState>()((set) => ({
  userData: {
    id: 0,
    name: "",
    email: "",
    balance: 0,
    role: "",
    phone_number: 0,
    referral_code: "",
    photos: "",
  },
  setUser: (data: IProfiles) =>
    set(() => ({
      userData: {
        id: data.id,
        name: data.name,
        email: data.email,
        balance: data.balance,
        role: data.role,
        phone_number: data.phone_number,
        referral_code: data.referral_code,
        photos: data.photos,
      },
    })),
  transactionDatas: {
    limit: "",
    page: "",
    sort: "",
    sort_by: "",
    search: "card",
    total_items: 0,
    total_pages: 0,
    data: [
      {
        id: 0,
        amount: 0,
        status: "",
        description: "",
        date: "",
        source_of_fund: "",
        sender: "",
        recipient: "",
      },
    ],
  },
  dataFilter: [],
  error: false,
  loading: false,
  message: "",
  setFetchTransaction: () => {
    set(() => ({ loading: true }));
    axios
      .get("http://localhost:8080/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        set(() => ({
          transactionDatas: response.data.data,
          loading: false,
          message: response.data.message,
        }));
        console.log(response.data.data, "3243");
        set((state) => {
          const dataShowFilter = showFilter(
            ShowFilterType.LAST_10_TRX,
            state.transactionDatas.data
          );

          const dataSort = sortBy(
            SortByType.DATE,
            SortType.DESC,
            dataShowFilter
          );

          const dataSearch = searchDescription("", dataSort);

          return { dataFilter: dataSearch };
        });
      })
      .catch((err) => {
        set(() => ({
          error: true,
          loading: false,
          message: err.response.data.message,
        }));
      });
  },
  filterTransaction: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => {
    set((state) => {
      set(() => ({ loading: true }));
      const dataShowFilter = showFilter(
        showFilterType,
        state.transactionDatas.data
      );

      console.log(dataShowFilter, "1212");
      const dataSort = sortBy(sortByType, sortType, dataShowFilter);

      const dataSearch = searchDescription(searchVal, dataSort);

      set(() => ({ loading: false }));
      return { dataFilter: dataSearch };
    });
  },
}));
