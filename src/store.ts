import userEvent from "@testing-library/user-event";
import axios from "axios";
import { stringify } from "querystring";
import create from "zustand";
import {
  IAddress,
  IAddReview,
  ICreateAddress,
  ICreatePayment,
  ICreateShipping,
  ICreateUserPromo,
  IDeleteResponse,
  IPayment,
  IPaymentResponse,
  IProfiles,
  IPromo,
  IShipping,
  ITopUp,
  ITopUpTransaction,
  ITransactions,
  ITransferTransaction,
  IUpdateAddress,
  IUpdateProfile,
  IUpdatePromo,
  IUpdateShippingStatus,
  IUserPromo,
} from "./interface";

interface TransactionState {
  transaction: ITransactions;
  transactionList: Array<ITransactions>;
  userProfiles: IProfiles;
  topUpResponse: ITopUp;
  deleteResponse: IDeleteResponse;
  createShippingResponse: IShipping;
  createAddressResponse: IAddress;
  updateAddressResponse: IAddress;
  updateShippingStatusResponse: IShipping;
  addReviewResponse: IShipping;
  updatePromoResponse: IPromo;
  updateProfileResponse: IProfiles;
  paymentResponse: IPaymentResponse;
  userPromoResponse: IUserPromo;
  message: string;
  fetchUserTransaction: () => void;
  fetchUserTransactions: () => void;
  fetchUserProfiles: () => void;
  postUserTransferTransactions: (payload: ITransferTransaction) => void;
  postUserTopUpTransactions: (payload: ITopUpTransaction) => void;
  postCreateShipping: (payload: ICreateShipping) => void;
  postCreatePayment: (payload: ICreatePayment) => void;
  postCreateAddress: (payload: ICreateAddress) => void;
  postUserPromo: (payload: ICreateUserPromo) => void;
  putUpdateAddress: (payload: IUpdateAddress) => void;
  putUpdateProfile: (payload: IUpdateProfile) => void;
  putUpdateShippingStatus: (payload: IUpdateShippingStatus) => void;
  putAddReview: (payload: IAddReview) => void;
  putUpdatePromo: (payload: IUpdatePromo) => void;
  deleteAddress: (payload: number) => void;
  deleteShipping: (payload: number) => void;
  getAddressById: (payload: number) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transaction: {} as ITransactions,
  fetchUserTransaction: async () => {
    console.log(localStorage.getItem("id_token"));
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.get(
        "https://courier-app-backend-production.up.railway.app/api/user/shipping"
      );
      console.log(response);
      set((state) => ({
        userProfiles: (state = response.data.data.data),
      }));
    } catch (error) {}
  },
  transactionList: [],
  fetchUserTransactions: async () => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.get(
        "https://courier-app-backend-production.up.railway.app/api/user/shipping"
      );

      set((state) => ({
        transactionList: (state = response.data.data.data),
      }));
    } catch (error) {}
  },

  postUserTransferTransactions: async (payload: ITransferTransaction) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.post(
        "https://courier-app-backend-production.up.railway.app/transactions/transfer",
        {
          to: payload.to,
          amount: parseInt(payload.amount.toString()),
          description: payload.description,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  topUpResponse: {} as ITopUp,
  postUserTopUpTransactions: async (payload: ITopUpTransaction) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.post(
        "https://courier-app-backend-production.up.railway.app/api/user/top-up",
        {
          amount: payload.amount,
          source_of_fund_id: payload.source_of_fund_id,
        }
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  createShippingResponse: {} as IShipping,
  postCreateShipping: async (payload: ICreateShipping) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.post(
        "https://courier-app-backend-production.up.railway.app/api/user/shipping",
        {
          size_id: payload.size_id,
          category_id: payload.category_id,
          add_on_id: payload.add_on_id,
          address_id: payload.address_id,
        }
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  createAddressResponse: {} as IAddress,
  postCreateAddress: async (payload: ICreateAddress) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.post(
        "https://courier-app-backend-production.up.railway.app/api/user/address",
        {
          full_address: payload.full_address,
          recipient_name: payload.recipient_name,
          recipient_phone_number: payload.recipient_phone_number,
        }
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  userPromoResponse: { id: 0, user: {}, promo: {}, status: 0 } as IUserPromo,
  postUserPromo: async (payload: ICreateUserPromo) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.post(
        "https://courier-app-backend-production.up.railway.app/api/user/user-promo",
        {
          user_id: payload.user_id,
          promo_id: payload.promo_id,
        }
      );
      console.log(response);
      set((state) => ({
        userPromoResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  updateAddressResponse: {} as IAddress,
  putUpdateAddress: async (payload: IUpdateAddress) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.put(
        `https://courier-app-backend-production.up.railway.app/user/address/${payload.id}`,
        {
          id: payload.id,
          full_address: payload.full_address,
          recipient_name: payload.recipient_name,
          recipient_phone_number: payload.recipient_phone_number,
        }
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  updatePromoResponse: {} as IPromo,
  putUpdatePromo: async (payload: IUpdatePromo) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.put(
        `https://courier-app-backend-production.up.railway.app/api/admin/promo/${payload.id}`,
        {
          id: payload.id,
          name: payload.name,
          min_fee: payload.min_fee,
          max_discount: payload.max_discount,
          discount: payload.discount,
          quota: payload.quota,
          exp_date: payload.exp_date,
        }
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  updateShippingStatusResponse: {} as IShipping,
  putUpdateShippingStatus: async (payload: IUpdateShippingStatus) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.put(
        `https://courier-app-backend-production.up.railway.app/api/admin/shipping/${payload.id}`,
        {
          id: payload.id,
          user_id: payload.user_id,
          address_id: payload.address_id,
          payment_id: payload.payment_id,
          size_id: payload.size_id,
          category_id: payload.category_id,
          add_on_id: payload.add_on_id,
          shipping_status: payload.shipping_status,
        }
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  addReviewResponse: {} as IShipping,
  putAddReview: async (payload: IAddReview) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.put(
        `https://courier-app-backend-production.up.railway.app/api/admin/shipping/${payload.id}`,
        {
          id: payload.id,
          user_id: payload.user_id,
          address_id: payload.address_id,
          payment_id: payload.payment_id,
          size_id: payload.size_id,
          category_id: payload.category_id,
          add_on_id: payload.add_on_id,
          shipping_status: payload.shipping_status,
          review: payload.review,
        }
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  updateProfileResponse: {} as IProfiles,
  putUpdateProfile: async (payload: IUpdateProfile) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.put(
        `https://courier-app-backend-production.up.railway.app/api/user/profile/${payload.id}`,
        {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          phone_number: payload.phone_number,
          photos: payload.photos,
        }
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  message: "",
  deleteResponse: {} as IDeleteResponse,
  deleteAddress: async (payload: number) => {
    set(() => ({
      // deleteResponse: (state = response.data.message),
      message: "",
    }));
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });
    let confirmAction = window.confirm("Are you sure to delete this address?");

    if (confirmAction) {
      alert("Address successfully deleted");
      try {
        const response = await requestInstance.delete(
          `https://courier-app-backend-production.up.railway.app/api/user/address/${payload}`,
          {}
        );

        console.log(response.data.message);
        set((state) => ({
          // deleteResponse: (state = response.data.message),

          message: response.data.message,
        }));
      } catch (error) {
        console.log(error);
        // alert("Invalid amount (min. 10000)");
      }
    } else {
      alert("Action canceled");
    }
  },
  deleteShipping: async (payload: number) => {
    set(() => ({
      // deleteResponse: (state = response.data.message),
      message: "",
    }));
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });
    let confirmAction = window.confirm("Are you sure to delete this shipping?");
    if (confirmAction) {
      alert("Address successfully deleted");
      try {
        const response = await requestInstance.delete(
          `https://courier-app-backend-production.up.railway.app/api/user/shipping/${payload}`,
          {}
        );

        console.log(response.data.message);
        set((state) => ({
          message: response.data.message,
        }));
      } catch (error) {
        console.log(error);
        // alert("Invalid amount (min. 10000)");
      }
    } else {
      alert("Action canceled");
    }
  },
  getAddressById: async (payload: number) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.get(
        `https://courier-app-backend-production.up.railway.app/api/user/address/${payload}`,
        {}
      );
      console.log(response.data);
      set((state) => ({
        topUpResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  paymentResponse: {} as IPaymentResponse,
  postCreatePayment: async (payload: ICreatePayment) => {
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.post(
        "https://courier-app-backend-production.up.railway.app/api/user/payment",
        {
          shipping_id: payload.shipping_id,
          user_promo_id: payload.user_promo_id,
        }
      );
      console.log(response);
      set((state) => ({
        paymentResponse: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
      // alert("Invalid amount (min. 10000)");
    }
  },
  userProfiles: {} as IProfiles,
  fetchUserProfiles: async () => {
    console.log(localStorage.getItem("id_token"));
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });

    try {
      const response = await requestInstance.get(
        "https://courier-app-backend-production.up.railway.app/api/user/profile"
      );
      console.log(response);
      set((state) => ({
        userProfiles: (state = response.data.data),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
