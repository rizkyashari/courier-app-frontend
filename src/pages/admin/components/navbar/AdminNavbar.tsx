import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTransactionStore } from "../../../../store";
import WelcomeAdmin from "../../../../assets/admin.png";

function AdminNavbar() {
  const navigate = useNavigate();
  const userProfileState = useTransactionStore((state) => state);

  useEffect(() => {
    userProfileState.fetchUserProfiles();
  }, []);

  const logout = () => {
    localStorage.removeItem("id_token");
    navigate("/login");
  };
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0  align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <a href="/admin" className="nav-link text-white align-middle px-0">
              <i className="fs-4 bi-house"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Home</span>
            </a>
          </li>
          <li>
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle text-white"
            >
              <i className="fs-4 bi-geo-alt"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Address</span>{" "}
            </a>
            <ul
              className="collapse show nav flex-column ms-1"
              id="submenu1"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <a href="/admin/address" className="nav-link  px-0">
                  <i className="fs-4 bi-pin-map"></i>{" "}
                  <span className="d-none d-sm-inline">Addresses List</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#submenu2"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle text-white"
            >
              <i className="fs-4 bi-cart-check"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Shipping</span>
            </a>
            <ul
              className="collapse nav flex-column ms-1"
              id="submenu2"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <a href="/admin/shipping" className="nav-link px-0">
                  <i className="fs-4 bi-truck"></i>{" "}
                  <span className="d-none d-sm-inline">Shippings List</span>
                </a>
              </li>
              <li>
                <a href="/admin/earning-reports" className="nav-link px-0">
                  <i className="fs-4 bi-coin"></i>{" "}
                  <span className="d-none d-sm-inline">Earnings Report</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#submenu3"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle text-white"
            >
              <i className="fs-4 bi-terminal"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Promos</span>{" "}
            </a>
            <ul
              className="collapse nav flex-column ms-1"
              id="submenu3"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <a href="/admin/promo" className="nav-link px-0">
                  <i className="fs-4 bi-terminal-split"></i>{" "}
                  <span className="d-none d-sm-inline">Promos List</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fs-4 bi-person-circle"></i>{" "}
            <span className="d-none d-sm-inline mx-1">
              {userProfileState.userProfiles.name}
            </span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="/admin/profile">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button onClick={logout} className="dropdown-item">
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
