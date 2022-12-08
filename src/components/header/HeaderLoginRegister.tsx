import React, { useEffect, useState } from "react";
import {
  Nav,
  NavMenuLeft,
  ResponsiveNavButton,
} from "../../styled-components/NavbarStyles";
import CompanyLogo from "../../assets/company-logo.jpg";

function HeaderLoginRegister() {
  return (
    <div>
      <Nav>
        <NavMenuLeft>
          <img src={CompanyLogo} width="75px" alt="Company Logo" />
          <h1 className="fw-bold">CourierExpress</h1>
          <ResponsiveNavButton>
            <i className="bi bi-list"></i>
          </ResponsiveNavButton>
        </NavMenuLeft>
      </Nav>
    </div>
  );
}

export default HeaderLoginRegister;
