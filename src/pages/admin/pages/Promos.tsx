import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import AdminTablePromo from "../components/table/AdminTablePromo";
import AdminTableShipping from "../components/table/AdminTableShipping";

function Promos() {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 overflow-auto flex-nowrap">
        <AdminNavbar />
        <AdminTablePromo />
      </div>
    </div>
  );
}

export default Promos;
