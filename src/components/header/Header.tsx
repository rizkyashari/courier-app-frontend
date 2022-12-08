import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Nav,
  NavMenuLeft,
  ResponsiveNavButton,
  NavMenuRight,
  NavLinkButton,
} from "../../styled-components/NavbarStyles";
import CompanyLogo from "../../assets/company-logo.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActived = (urlPath: string): string => {
    return urlPath === location.pathname ? "nav-link active" : "nav-link";
  };

  useEffect(() => {
    let userInLocalStorage = localStorage.getItem("id_token");
    if (userInLocalStorage === null) {
      alert("You have to login first to access this page");
      navigate("/login");
      console.log(userInLocalStorage, "23244");
      return;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("id_token");
    navigate("/login");
  };
  return (
    <div className="sticky-top bg-white">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <img src={CompanyLogo} width="75px" alt="Company Logo" />
          <h1 className="fw-bold text-white">CourierExpress</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarCollapse"
          >
            <ul className="navbar-nav  mr-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home" className={isActived("/home")}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/address" className={isActived("/address")}>
                  Address
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shipping" className={isActived("/shipping")}>
                  Shipping
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/top-up" className={isActived("/top-up")}>
                  Top Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className={isActived("/profile")}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <Nav>
        <NavMenuLeft>
          <img src={CompanyLogo} width="75px" alt="Company Logo" />
          <h1 className="fw-bold">CourierExpress</h1>
          <ResponsiveNavButton>
            <i className="bi bi-list"></i>
          </ResponsiveNavButton>
        </NavMenuLeft>

        <NavMenuRight id="menu-right">
          <Link to="/home">
            <NavLinkButton>Home</NavLinkButton>
          </Link>
          <Link to="/address">
            <NavLinkButton>Address</NavLinkButton>
          </Link>
          <Link to="/shipping">
            <NavLinkButton>Shipping</NavLinkButton>
          </Link>
          <Link to="/top-up">
            <NavLinkButton>Top Up</NavLinkButton>
          </Link>
          <Link to="/profile">
            <NavLinkButton>Profile</NavLinkButton>
          </Link>
          <NavLinkButton onClick={logout}>Logout</NavLinkButton>
        </NavMenuRight>
      </Nav> */}
    </div>
  );
}

export default Header;
