import React, { useEffect } from "react";
import Greetings from "../../../components/greetings/Greetings";
import { useTransactionStore } from "../../../store";
import AdminNavbar from "../components/navbar/AdminNavbar";
import imageProfile from "../../../assets/dummy-profile-pic.jpg";
import { Link } from "react-router-dom";

function AdminProfile() {
  const userProfileState = useTransactionStore((state) => state);

  useEffect(() => {
    userProfileState.fetchUserProfiles();
  }, []);
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 flex-nowrap overflow-auto">
        <AdminNavbar />
        <div className="container col d-flex flex-column h-sm-100">
          <Greetings />
          <div className="d-flex justify-content-center">
            <div className="p-2 flex-fill d-flex justify-content-center">
              <div className="card" style={{ width: "18rem" }}>
                {userProfileState.userProfiles.photos == "" ? (
                  <img src={imageProfile} className="card-img-top" alt="..." />
                ) : (
                  <img
                    src={userProfileState.userProfiles.photos}
                    className="card-img-top"
                    alt="..."
                  />
                )}

                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2 flex-fill">
              <div className="card">
                <h5 className="card-header">Profile Details</h5>
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row">Name</th>
                        <td>{userProfileState.userProfiles.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{userProfileState.userProfiles.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Phone Number</th>
                        <td colSpan={2}>
                          {userProfileState.userProfiles.phone_number}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Role</th>
                        <td colSpan={2}>
                          {userProfileState.userProfiles.role}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to="/admin/edit-profile">
                    <button className="btn btn-success">Edit Profile</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
