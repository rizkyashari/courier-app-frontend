import axios from "axios";
import create from "zustand";
import { IAddress, IPayment, IProfiles, IShippingPaginate } from "./interface";
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
  SIZE = "SIZE",
  CATEGORY = "CATEGORY",
  PAYMENT = "PAYMENT",
  SHIPPING_STATUS = "SHIPPING_STATUS",
}

export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

const showFilter = (
  typeFilter: ShowFilterType,

  dataTrx: IAddress[]
): IAddress[] => {
  let result: IAddress[] = [];

  switch (typeFilter) {
    case ShowFilterType.LAST_10_TRX:
      result = dataTrx
        .sort(
          (a, b) =>
            moment(b.UpdatedAt).format("x") - moment(a.UpdatedAt).format("x")
        )
        .slice(0, 10);
      return result;

    case ShowFilterType.THIS_MONTH:
      const currentMonth = Number(moment().month()) + 1;
      result = dataTrx.filter(
        (trx) =>
          moment(trx.UpdatedAt).format("M") == currentMonth &&
          moment(trx.UpdatedAt).format("Y") == Number(moment().year())
      );
      return result;

    case ShowFilterType.LAST_MONTH:
      result = dataTrx.filter(
        (trx) =>
          moment(trx.UpdatedAt).format("M") == Number(moment().month()) &&
          moment(trx.UpdatedAt).format("Y") == Number(moment().year())
      );

      return result;

    case ShowFilterType.THIS_YEAR:
      const currentYear = Number(moment().year());

      result = dataTrx.filter(
        (trx) => moment(trx.UpdatedAt).format("Y") == currentYear
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

  dataTrx: IAddress[]
): IAddress[] => {
  let result: IAddress[] = [];

  switch (sortByType) {
    case SortByType.DATE:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return (
            moment(a.UpdatedAt).format("x") - moment(b.UpdatedAt).format("x")
          );
        }

        return (
          moment(b.UpdatedAt).format("x") - moment(a.UpdatedAt).format("x")
        );
      });

      return result;

    default:
      return result;
  }
};

const searchDescription = (
  search: string,

  dataTrx: IAddress[]
): IAddress[] => {
  let result = dataTrx.filter((trx) =>
    trx.recipient_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return result;
};

const searchUser = (
  search: string,

  dataTrx: IAddress[]
): IAddress[] => {
  let result = dataTrx.filter((trx) =>
    trx.user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return result;
};

interface AddressState {
  userData: IProfiles;
  addressDatas: IAddress[];
  dataFilter: IAddress[];
  loading: boolean;
  error: boolean;
  message: string;
  setUser: (data: IProfiles) => void;
  setFetchAddress: () => void;
  setFetchAddressAdmin: () => void;
  filterAddress: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => void;
  filterAddressAdmin: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => void;
}

export const useStoreAddress = create<AddressState>()((set) => ({
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
  addressDatas: [],
  dataFilter: [],
  error: false,
  loading: false,
  message: "",
  setFetchAddress: () => {
    let token = localStorage.getItem("id_token");
    set(() => ({ loading: true }));
    axios
      .get("http://localhost:8080/api/user/address", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        set(() => ({
          addressDatas: response.data.data,
          loading: false,
          message: response.data.message,
        }));
        console.log(response.data.data, "3243");
        set((state) => {
          const dataShowFilter = showFilter(
            ShowFilterType.LAST_10_TRX,
            state.addressDatas
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
  setFetchAddressAdmin: () => {
    let token = localStorage.getItem("id_token");
    set(() => ({ loading: true }));
    axios
      .get("http://localhost:8080/api/admin/address", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        set(() => ({
          addressDatas: response.data.data,
          loading: false,
          message: response.data.message,
        }));
        console.log(response.data.data, "3243");
        set((state) => {
          const dataShowFilter = showFilter(
            ShowFilterType.LAST_10_TRX,
            state.addressDatas
          );

          const dataSort = sortBy(
            SortByType.DATE,
            SortType.DESC,
            dataShowFilter
          );

          const dataSearch = searchUser("", dataSort);

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
  filterAddress: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => {
    set((state) => {
      set(() => ({ loading: true }));
      const dataShowFilter = showFilter(showFilterType, state.addressDatas);

      console.log(dataShowFilter, "1212");
      const dataSort = sortBy(sortByType, sortType, dataShowFilter);

      const dataSearch = searchDescription(searchVal, dataSort);

      set(() => ({ loading: false }));
      return { dataFilter: dataSearch };
    });
  },
  filterAddressAdmin: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => {
    set((state) => {
      set(() => ({ loading: true }));
      const dataShowFilter = showFilter(showFilterType, state.addressDatas);

      console.log(dataShowFilter, "1212");
      const dataSort = sortBy(sortByType, sortType, dataShowFilter);

      const dataSearch = searchUser(searchVal, dataSort);

      set(() => ({ loading: false }));
      return { dataFilter: dataSearch };
    });
  },
}));
