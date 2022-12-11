import React, { useEffect } from "react";
import { useTransactionStore } from "../../store";
import { JustifyContentEnd } from "../../styled-components/GlobalStyles";

function Balance() {
  const userProfileState = useTransactionStore((state) => state);

  useEffect(() => {
    userProfileState.fetchUserProfiles();
  }, []);
  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <h2 className="d-flex justify-content-center justify-content-lg-end">
          Balance:
        </h2>
        <br></br>
        <h1 className="d-flex justify-content-center justify-content-lg-end fw-bold">
          IDR{" "}
          {Intl.NumberFormat("id-ID").format(
            userProfileState.userProfiles.balance
          )}
        </h1>
      </div>
      <div className="row"></div>
    </div>
  );
}

export default Balance;
