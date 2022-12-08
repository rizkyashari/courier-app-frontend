import React from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import AdminTableEarningReports from "../components/table/AdminTableEarningReports";

function EarningReports() {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 overflow-auto flex-nowrap">
        <AdminNavbar />
        <AdminTableEarningReports />
      </div>
    </div>
  );
}

export default EarningReports;
