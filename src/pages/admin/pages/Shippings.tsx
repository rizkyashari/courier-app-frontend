import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import AdminTableShipping from "../components/table/AdminTableShipping";

function Shippings() {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 overflow-auto flex-nowrap">
        <AdminNavbar />
        <AdminTableShipping />
      </div>
    </div>
  );
}

export default Shippings;
