import React, { useEffect } from "react";
import { useTransactionStore } from "../../store";
import { JustifyContentEnd } from "../../styled-components/GlobalStyles";

function Balance() {
  const userProfileState = useTransactionStore((state) => state);

  useEffect(() => {
    userProfileState.fetchUserProfiles();
  }, []);
  return (
    <JustifyContentEnd>
      <div className="row">
        <h2 className="d-flex justify-content-end">Balance:</h2>
        <br></br>
        <h1 className="d-flex justify-content-end fw-bold">
          IDR{" "}
          {Intl.NumberFormat("id-ID").format(
            userProfileState.userProfiles.balance
          )}
        </h1>
      </div>
      <div className="row"></div>
    </JustifyContentEnd>
  );
}

export default Balance;
