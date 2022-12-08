import React, { useEffect } from "react";
import { useTransactionStore } from "../../store";

function Greetings() {
  const userProfileState = useTransactionStore((state) => state);

  useEffect(() => {
    userProfileState.fetchUserProfiles();
  }, []);
  console.log(userProfileState.userProfiles.name);
  return (
    <div className="container my-3 p-5">
      <h2 className="fw-bold mt-5 d-flex justify-content-center">
        Welcome, {userProfileState.userProfiles.name}
      </h2>
      {/* <p>Account: {userProfileState.userProfiles.wallet_number}</p> */}
    </div>
  );
}

export default Greetings;
