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

  dataTrx: IShipping[]
): IShipping[] => {
  let result: IShipping[] = [];

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

  dataTrx: IShipping[]
): IShipping[] => {
  let result: IShipping[] = [];

  switch (sortByType) {
    case SortByType.SIZE:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return a.size.id - b.size.id;
        }

        return b.size.id - a.size.id;
      });

      return result;
    case SortByType.CATEGORY:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return a.category.id - b.category.id;
        }

        return b.category.id - a.category.id;
      });

      return result;
    case SortByType.PAYMENT:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return a.payment.id - a.payment.id;
        }

        return b.payment.id - a.payment.id;
      });

      return result;
    case SortByType.SHIPPING_STATUS:
      result = dataTrx.sort((a, b) => {
        if (sortType === SortType.ASC) {
          return a.shipping_status.length - b.shipping_status.length;
        }

        return b.shipping_status.length - a.shipping_status.length;
      });

      return result;
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

  dataTrx: IShipping[]
): IShipping[] => {
  let result = dataTrx.filter((trx) =>
    trx.shipping_status.toLocaleLowerCase().includes(search.toLocaleLowerCase())
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

interface ShippingState {
  userData: IProfiles;
  shippingDatas: IShipping[];
  shippingDatasPaginate: IShippingPaginate;
  paymentDatas: IPayment[];
  // dataFilter: IShipping[];
  dataFilter: IShipping[];
  loading: boolean;
  error: boolean;
  message: string;
  setUser: (data: IProfiles) => void;
  // setFetchShipping: () => void;
  setFetchShipping: (payload: number) => void;
  setFetchShippingAdmin: (payload: number) => void;
  filterShipping: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => void;
  filterShippingAdmin: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => void;
  setFetchPayment: () => void;
}

export const useStoreProfile = create<ShippingState>()((set) => ({
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
  shippingDatas: [],
  shippingDatasPaginate: {
    current_page: 0,
    data: [
      {
        length: 0,
        id: 0,
        user: {
          id: 0,
          name: "",
          email: "",
          role: "",
          phone_number: 0,
          balance: 0,
          referral_code: "",
          photos: "",
        },
        size: {
          id: 0,
          name: "",
          description: "",
          price: 0,
        },
        address: {
          id: 0,
          user: {
            id: 0,
            name: "",
            email: "",
            role: "",
            phone_number: 0,
            balance: 0,
            referral_code: "",
            photos: "",
          },
          UpdatedAt: "",
          full_address: "",
          recipient_name: "",
          recipient_phone_number: 0,
        },
        payment: {
          id: 0,
          payment_status: "",
          total_cost: 0,
          user_id: {
            id: 0,
            name: "",
            email: "",
            role: "",
            phone_number: 0,
            balance: 0,
            referral_code: "",
            photos: "",
          },
          CreatedAt: "",
          promo_id: {
            id: 0,
            name: "",
            min_fee: 0,
            max_discount: 0,
            discount: 0,
            quota: 0,
            exp_date: "",
            UpdatedAt: "",
          },
        },
        category: {
          id: 0,
          name: "",
          description: "",
          price: 0,
        },
        add_on: {
          id: 0,
          name: "",
          description: "",
          price: 0,
        },
        shipping_status: "",
        review: "",
        UpdatedAt: "",
      },
    ],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    next_page_url: "",
    path: "",
    per_page: 0,
    prev_page_url: "",
    to: 0,
    total: 0,
  },
  dataFilter: [],
  paymentDatas: [],
  error: false,
  loading: false,
  message: "",
  setFetchPayment: () => {
    let token = localStorage.getItem("id_token");
    set(() => ({ loading: true }));
    axios
      .get("http://localhost:8080/api/user/payment", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        set(() => ({
          paymentDatas: response.data.data,
          loading: false,
          message: response.data.message,
        }));
        console.log(response.data.data, "25181t2e7t127g17dg271f12");
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
  setFetchShipping: (payload: number) => {
    let token = localStorage.getItem("id_token");
    console.log(token, "=======================================");
    set(() => ({ loading: true, dataFilter: [] }));
    axios
      .get(`http://localhost:8080/api/user/shipping?page=${payload}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response, "WGDWQYUDGQFDWFQFDUQFQWYDF");
        set(() => ({
          shippingDatas: response.data.data.data,
          loading: false,
          message: response.statusText,
        }));
        console.log(response.data.data, "3243");
        set((state) => {
          const dataShowFilter = showFilter(
            ShowFilterType.LAST_10_TRX,
            state.shippingDatas
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
  setFetchShippingAdmin: (payload: number) => {
    let token = localStorage.getItem("id_token");
    console.log(token, "=======================================");
    set(() => ({ loading: true, dataFilter: [] }));
    axios
      .get(`http://localhost:8080/api/admin/shipping?page=${payload}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data, "WGDWQYUDGQFDWFQFDUQFQWYDF");
        set(() => ({
          shippingDatas: response.data.data,
          loading: false,
          message: response.data.message,
        }));
        console.log(response.data.data, "3243");
        set((state) => {
          const dataShowFilter = showFilter(
            ShowFilterType.LAST_10_TRX,
            state.shippingDatas
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
  filterShipping: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => {
    set((state) => {
      set(() => ({ loading: true }));
      const dataShowFilter = showFilter(showFilterType, state.shippingDatas);
      // const dataShowFilter = showFilter(
      //   showFilterType,
      //   state.shippingDatasPaginate.data
      // );

      console.log(dataShowFilter, "12121313131313131");
      const dataSort = sortBy(sortByType, sortType, dataShowFilter);

      const dataSearch = searchDescription(searchVal, dataSort);

      set(() => ({ loading: false }));
      return { dataFilter: dataSearch };
    });
  },
  filterShippingAdmin: (
    showFilterType: ShowFilterType,
    sortByType: SortByType,
    sortType: SortType,
    searchVal: string
  ) => {
    set((state) => {
      set(() => ({ loading: true }));
      const dataShowFilter = showFilter(showFilterType, state.shippingDatas);

      console.log(dataShowFilter, "1212");
      const dataSort = sortBy(sortByType, sortType, dataShowFilter);

      const dataSearch = searchUser(searchVal, dataSort);

      set(() => ({ loading: false }));
      return { dataFilter: dataSearch };
    });
  },
}));
