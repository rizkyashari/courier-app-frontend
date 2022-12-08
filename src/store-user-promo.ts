import axios from "axios";
import create from "zustand";
import { IProfiles, IPromo, IUserPromo } from "./interface";
const moment = require("moment");

interface PromoState {
  userPromoDatas: IUserPromo[];
  loading: boolean;
  error: boolean;
  message: string;
  setFetchUserPromo: () => void;
}

export const useStoreUserPromo = create<PromoState>()((set) => ({
  userPromoDatas: [],
  error: false,
  loading: false,
  message: "",
  setFetchUserPromo: () => {
    let token = localStorage.getItem("id_token");
    set(() => ({ loading: true }));
    axios
      .get(
        "https://courier-app-backend-production.up.railway.app/api/user/user-promo",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        set(() => ({
          userPromoDatas: response.data.data,
          loading: false,
          message: response.data.message,
        }));
        console.log(response.data.data, "3243");
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
}));
