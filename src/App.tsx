import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/game/Game";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Redirect from "./pages/Redirect";
import Register from "./pages/register/Register";
import Topup from "./pages/topup/Topup";
import Shipping from "./pages/shipping/Shipping";
import { Body } from "./styled-components/GlobalStyles";
import CreateShipping from "./pages/shipping/CreateShipping";
import ShippingDetails from "./pages/shipping/ShippingDetails";
import Payment from "./pages/payment/Payment";
import Address from "./pages/address/Address";
import AddressDetails from "./pages/address/AddressDetails";
import CreateAddress from "./pages/address/CreateAddress";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import HomePage from "./pages/admin/pages/HomePage";
import Addresses from "./pages/admin/pages/Addresses";
import Shippings from "./pages/admin/pages/Shippings";
import Promos from "./pages/admin/pages/Promos";
import AdminShippingDetails from "./pages/admin/pages/AdminShippingDetails";
import ImageUploader from "./pages/profile/ImageUploader";
import AdminProfile from "./pages/admin/pages/AdminProfile";
import AdminEditProfile from "./pages/admin/pages/AdminEditProfile";
import AdminPromoDetails from "./pages/admin/pages/AdminPromoDetails";
import EarningReports from "./pages/admin/pages/EarningReports";
import Coin from "./components/table/Coin";
import AdminNavbar from "./pages/admin/components/navbar/AdminNavbar";
import Header from "./components/header/Header";

function App() {
  return (
    <Body>
      <div className="App">
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/coin" element={<Coin />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/shipping/:id" element={<ShippingDetails />} />
          <Route path="/shipping/:id/payment" element={<Payment />} />
          <Route path="/create-shipping" element={<CreateShipping />} />
          <Route path="/address" element={<Address />} />
          <Route path="/address/:id" element={<AddressDetails />} />
          <Route path="/create-address" element={<CreateAddress />} />
          <Route path="/top-up" element={<Topup />} />
          <Route path="/game" element={<Game />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/image-uploader" element={<ImageUploader />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/admin" element={<HomePage />} />
          <Route path="/admin/address" element={<Addresses />} />
          <Route path="/admin/shipping" element={<Shippings />} />
          <Route
            path="/admin/shipping/:id"
            element={<AdminShippingDetails />}
          />
          <Route path="/admin/earning-reports" element={<EarningReports />} />
          <Route path="/admin/promo" element={<Promos />} />
          <Route path="/admin/promo/:id" element={<AdminPromoDetails />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/edit-profile" element={<AdminEditProfile />} />
        </Routes>
      </div>
    </Body>
  );
}

export default App;
