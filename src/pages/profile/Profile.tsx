import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import imageProfile from "../../assets/dummy-profile-pic.jpg";
import { useTransactionStore } from "../../store";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

function Profile() {
  const userProfileState = useTransactionStore((state) => state);

  useEffect(() => {
    userProfileState.fetchUserProfiles();
  }, []);
  return (
    <>
      <Header />
      <div className="container my-5 mt-5 p-5">
        <div className="container mt-5 p-5">
          <div className="row justify-content-md-center">
            <div className="col-lg-6 col-xs-12">
              <div className="card">
                {userProfileState.userProfiles.photos == "" ? (
                  <img
                    src={imageProfile}
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                ) : (
                  <img
                    src={userProfileState.userProfiles.photos}
                    className="card-img-top"
                    alt="..."
                  />
                )}

                <div className="card-body">
                  <p className="card-text text-center">
                    Photo of {userProfileState.userProfiles.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xs-12">
              <div className="card">
                <h5 className="card-header">Profile Details</h5>
                <div className="card-body table-responsive">
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
                      <tr>
                        <th scope="row">Referral Code</th>
                        <td colSpan={2}>
                          {userProfileState.userProfiles.referral_code}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Balance</th>
                        <td colSpan={2}>
                          IDR{" "}
                          {Intl.NumberFormat("id-ID").format(
                            userProfileState.userProfiles.balance
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Link to="/edit-profile">
                    <button className="btn btn-success">Edit Profile</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
