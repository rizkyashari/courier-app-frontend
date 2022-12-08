import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import AdminTableAddress from "../components/table/AdminTableAddress";

function Addresses() {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 overflow-auto flex-nowrap">
        <AdminNavbar />
        <AdminTableAddress />
      </div>
    </div>
  );
}

export default Addresses;
