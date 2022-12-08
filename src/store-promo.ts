import axios from "axios";
import create from "zustand";
import { IPayment, IProfiles, IPromo, IShippingPaginate } from "./interface";
import { IShipping } from "./interface";
import { ITransactionPaginate, IUser } from "./interface";
const moment = require("moment");

// let token = localStorage.getItem("id_token");

export enum ShowFilterType {
  LAST_10_TRX = "LAST_10_TRX",
  THIS_MONTH = "THIS_MONTH",
  LAST_MONTH = "LAST_MONTH",
  THIS_YEAR = "THIS_YEAR",
  LAST_YEAR = "LAST_YEAR",
}

export enum SortByType {
  DATE = "DATE",
  QUOTA = "QUOTA",
}

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

const showFilter = (
  typeFilter: ShowFilterType,

  dataTrx: IPromo[]
): IPromo[] => {
  let result: IPromo[] = [];

  switch (typeFilter) {
    case ShowFilterType.LAST_10_TRX:
      result = dataTrx
        .sort(
          (a, b) =>
            moment(b.exp_date).format("x") - moment(a.exp_date).format("x")
        )
        .slice(0, 10);
      return result;

    case ShowFilterType.THIS_MONTH:
      const currentMonth = Number(moment().month()) + 1;
      result = dataTrx.filter(
        (trx) =>
          moment(trx.exp_date).format("M") == currentMonth &&
          moment(trx.exp_date).format("Y") == Number(moment().year())
      );
      return result;

    case ShowFilterType.LAST_MONTH:
      result = dataTrx.filter(
        (trx) =>
          moment(trx.exp_date).format("M") == Number(moment().month()) &&
          moment(trx.exp_date).format("Y") == Number(moment().year())
      );

      return result;

    case ShowFilterType.THIS_YEAR:
      const currentYear = Number(moment().year());

      result = dataTrx.filter(
        (trx) => moment(trx.exp_date).format("Y") == currentYear
      );

      return result;

    case ShowFilterType.LAST_YEAR:
      const lastYear = Number(moment().year()) - 1;

      result = dataTrx.filter(
        (trx) => moment(trx.UpdatedAt).format("Y") == lastYear
      );

      return result;

    default:
      return result;
  }
};

const sortBy = (
  sortByType: SortByType,

  sortType: SortType,

  dataTrx: IPromo[]
): IPromo[] => {
  let result: IPromo[] = [];

  switch (sortByType) {
    case SortByType.QUOTA:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return a.quota - b.quota;
        }

        return b.quota - a.quota;
      });
      return result;

    case SortByType.DATE:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return (
            moment(a.exp_date).format("x") - moment(b.exp_date).format("x")
          );
        }

        return moment(b.exp_date).format("x") - moment(a.exp_date).format("x");
      });

      return result;

    default:
      return result;
  }
};

const searchDescription = (
  search: string,

  dataTrx: IPromo[]
): IPromo[] => {
  let result = dataTrx.filter((trx) =>
    trx.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return result;
};

interface PromoState {
  userData: IProfiles;
  promoDatas: IPromo[];
  dataFilter: IPromo[];
  loading: boolean;
  error: boolean;
  message: string;
  setUser: (data: IProfiles) => void;
  setFetchPromo: () => void;
  filterPromo: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => void;
}

export const useStorePromo = create<PromoState>()((set) => ({
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
  promoDatas: [],
  dataFilter: [],
  error: false,
  loading: false,
  message: "",
  setFetchPromo: () => {
    let token = localStorage.getItem("id_token");
    set(() => ({ loading: true }));
    axios
      .get(
        "https://courier-app-backend-production.up.railway.app/api/admin/promo",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        set(() => ({
          promoDatas: response.data.data,
          loading: false,
          message: response.data.message,
        }));
        console.log(response.data.data, "3243");
        set((state) => {
          const dataShowFilter = showFilter(
            ShowFilterType.LAST_10_TRX,
            state.promoDatas
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
        console.log(err);
      });
  },
  filterPromo: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => {
    set((state) => {
      set(() => ({ loading: true }));
      const dataShowFilter = showFilter(showFilterType, state.promoDatas);

      console.log(dataShowFilter, "1212");
      const dataSort = sortBy(sortByType, sortType, dataShowFilter);

      const dataSearch = searchDescription(searchVal, dataSort);

      set(() => ({ loading: false }));
      return { dataFilter: dataSearch };
    });
  },
}));
