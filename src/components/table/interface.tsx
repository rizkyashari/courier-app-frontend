// export interface ICoin {
//   id: string;
//   name: string;
//   current_price: number;
//   symbol: string;
//   price_change_percentage_24h: number;
//   image: string;
//   market_cap: number;
//   market_cap_rank: number;
// }

import {
  IAddOn,
  IAddress,
  ICategory,
  IPayment,
  IProfiles,
  ISize,
} from "../../interface";

export interface IShipping {
  length: number;
  id: number;
  user: IProfiles;
  updated_at: string;
  size: ISize;
  address: IAddress;
  payment: IPayment;
  category: ICategory;
  add_on: IAddOn;
  shipping_status: string;
  review: string;
}
