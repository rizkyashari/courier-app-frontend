export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ITransactions {
  id: number;
  amount: number;
  status: string;
  description: string;
  date: string;
  source_of_fund: string;
  sender: string;
  recipient: string;
}

export interface ISize {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface IAddress {
  id: number;
  user: IProfiles;
  UpdatedAt: string;
  full_address: string;
  recipient_name: string;
  recipient_phone_number: number;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface IPayment {
  id: number;
  payment_status: string;
  total_cost: number;
}

export interface IAddOn {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface IShippingResponse {
  status: boolean;
  message: string;
  errors: string;
  data: IShipping;
}

export interface IPromoResponse {
  status: boolean;
  message: string;
  errors: string;
  data: IPromo;
}

export interface IAddressResponse {
  status: boolean;
  message: string;
  errors: string;
  data: IAddress;
}

export interface IPaymentResponse {
  status: boolean;
  message: string;
  errors: string;
  data: IPayment;
}

export interface IDeleteResponse {
  status: boolean;
  message: string;
  errors: string;
  data: {};
}

export interface IShipping {
  length: number;
  id: number;
  user: IProfiles;
  UpdatedAt: string;
  size: ISize;
  address: IAddress;
  payment: IPayment;
  category: ICategory;
  add_on: IAddOn;
  shipping_status: string;
  review: string;
}

export interface IPromo {
  id: number;
  name: string;
  min_fee: number;
  max_discount: number;
  discount: number;
  quota: number;
  exp_date: string;
  UpdatedAt: string;
}

export interface IUserPromo {
  id: number;
  user: IProfiles;
  promo: IPromo;
  status: number;
}

export interface IPayment {
  id: number;
  user_id: IProfiles;
  CreatedAt: string;
  payment_status: string;
  total_cost: number;
  promo_id: IPromo;
}

export interface ITransferTransaction {
  to: string;
  amount: number;
  description: string;
}

export interface ITopUpTransaction {
  amount: number;
  source_of_fund_id: number;
}

export interface ICreateShipping {
  size_id: number;
  category_id: number;
  add_on_id: number;
  address_id: number;
}

export interface ICreateAddress {
  full_address: string;
  recipient_name: string;
  recipient_phone_number: number;
}

export interface ICreateUserPromo {
  user_id: number;
  promo_id: number;
}

export interface IUpdateAddress {
  id: number;
  full_address: string;
  recipient_name: string;
  recipient_phone_number: number;
}

export interface IUpdateShippingStatus {
  id: number;
  user_id: number;
  address_id: number;
  payment_id: number;
  size_id: number;
  category_id: number;
  add_on_id: number;
  shipping_status: string;
}

export interface IAddReview {
  id: number;
  user_id: number;
  address_id: number;
  payment_id: number;
  size_id: number;
  category_id: number;
  add_on_id: number;
  shipping_status: string;
  review: string;
}

export interface IUpdatePromo {
  id: number;
  name: string;
  min_fee: number;
  max_discount: number;
  discount: number;
  quota: number;
  exp_date: string;
}

export interface IUpdateProfile {
  id: number;
  name: string;
  email: string;
  phone_number: number;
  photos: string;
}

export interface ICreatePayment {
  shipping_id: number;
  user_promo_id: number;
}

export interface IProfiles {
  id: number;
  name: string;
  email: string;
  role: string;
  phone_number: number;
  balance: number;
  referral_code: string;
  photos: string;
}

export interface ITopUpResponse {
  code: number;
  message: string;
  data: ITopUp;
  is_error: boolean;
}

export interface ITopUp {
  amount: number;
  source_of_fund: string;
  status: string;
  description: string;
  date: string;
  balance: string;
}

export interface ITransactionPaginate {
  limit: string;
  page: string;
  sort: string;
  sort_by: string;
  search: string;
  total_items: number;
  total_pages: number;
  data: ITransactions[];
}

export interface IShippingPaginate {
  current_page: number;
  data: IShipping[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}
