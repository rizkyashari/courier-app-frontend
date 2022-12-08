import React from "react";
import Greetings from "../../../components/greetings/Greetings";
import AdminNavbar from "../components/navbar/AdminNavbar";
import WelcomeAdmin from "../../../assets/admin.png";

function HomePage() {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 flex-nowrap overflow-auto">
        <AdminNavbar />
        <div className="container col d-flex flex-column h-sm-100">
          <Greetings />
          <img src={WelcomeAdmin} width="1200px" alt="Welcome Admin" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
