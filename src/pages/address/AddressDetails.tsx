import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import { IAddressResponse } from "../../interface";
import { useTransactionStore } from "../../store";
import { useStoreAddress } from "../../store-address";

function AddressDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetch<IAddressResponse>(
    `https://courier-app-backend-production.up.railway.app/api/user/address/${id}`
  );
  const navigate = useNavigate();
  console.log("data listCustom", data);
  console.log(data?.data.full_address, "=========================");
  const transactionState = useTransactionStore((state) => state);
  const userProfileState = useTransactionStore((state) => state);
  const { setFetchAddress, addressDatas, dataFilter } = useStoreAddress();

  // console.log(addressDatas[0].full_address, "===================");
  console.log(dataFilter, "1111111111111111111111");
  useEffect(() => {
    transactionState.fetchUserTransactions();
    userProfileState.fetchUserProfiles();
  }, []);
  useEffect(() => {
    setFetchAddress();
  }, []);

  const [input, setInput] = useState({
    id: 0,
    full_address: "",
    recipient_name: "",
    recipient_phone_number: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};

  const handleChangeInput = (event: FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget);
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const EInputAddressId = document.getElementById(
      "inputAddressId"
    ) as HTMLSelectElement;
    const EInputFullAddress = document.getElementById(
      "inputFullAddress"
    ) as HTMLInputElement;
    const EInputRecipientName = document.getElementById(
      "inputRecipientName"
    ) as HTMLInputElement;
    const EInputRecipientPhoneNumber = document.getElementById(
      "inputRecipientPhoneNumber"
    ) as HTMLInputElement;

    transactionState.putUpdateAddress({
      id: parseInt(EInputAddressId.value),
      full_address: EInputFullAddress.value,
      recipient_name: EInputRecipientName.value,
      recipient_phone_number: parseInt(EInputRecipientPhoneNumber.value),
    });
  };

  let fullAddress = "";
  if (data?.data.full_address) {
    fullAddress = data?.data.full_address;
  }

  let recipientName = "";
  if (data?.data.recipient_name) {
    recipientName = data?.data.recipient_name;
  }

  let recipientPhoneNumber = 0;
  if (data?.data.recipient_phone_number) {
    recipientPhoneNumber = data?.data.recipient_phone_number;
  }

  console.log(data?.data.full_address, "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
  const [inputFullAddress, setFullAddress] = useState(fullAddress);
  const [inputRecipientName, setRecipientName] = useState(recipientName);
  const [inputPhoneNumber, setRecipientPhoneNumber] =
    useState(recipientPhoneNumber);

  return (
    <div className="container mt-5 p-5">
      <Header />
      <Link
        to="/address"
        className="mt-4 d-flex justify-content-center justify-content-lg-start"
      >
        <button className="btn btn-success">Back</button>
      </Link>
      {error ? <p>Error</p> : null}
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="d-flex justify-content-center my-4">
          <div className="card">
            <div className="card-header d-flex justify-content-center">
              Address Details
            </div>
            <div className="card-body">
              <div className="d-flex">
                <div className="p-2 flex-grow-1">
                  <h5 className="card-title">Address ID</h5>
                  <p>{id}</p>
                  <h5 className="card-title">Recipient Name</h5>
                  <p>{data?.data.recipient_name}</p>
                  <h5 className="card-title">Full Address</h5>
                  <p>{data?.data.full_address}</p>
                  <h5 className="card-title">Recipient Phone Number</h5>
                  <p>{String(data?.data.recipient_phone_number)}</p>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Edit Address
                    </button>
                  </div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Edit Address
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form className="p-2">
                            <label>Address ID</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={id}
                              className="form-select"
                              id="inputAddressId"
                              name="inputAddressId"
                              disabled
                            >
                              <option value={id}>{id}</option>
                            </select>
                            <label>Full Address</label>
                            <input
                              className="form-control"
                              type="text"
                              name="full_address"
                              placeholder="Enter full address"
                              id="inputFullAddress"
                              // onChange={(event) => handleChangeInput(event)}
                              onChange={(e) => setFullAddress(e.target.value)}
                              value={inputFullAddress}
                            />

                            <div className="mb-3">
                              <label>Recipient Name</label>
                              <input
                                className="form-control"
                                type="text"
                                name="recipient_name"
                                placeholder="Enter recipient name"
                                id="inputRecipientName"
                                onChange={(event) => handleChangeInput(event)}
                              />
                            </div>
                            <div className="mb-3">
                              <label>Recipient Phone Number</label>
                              <input
                                className="form-control"
                                type="number"
                                name="recipient_phone"
                                placeholder="Enter recipient phone number"
                                id="inputRecipientPhoneNumber"
                                onChange={(event) => handleChangeInput(event)}
                              />
                            </div>
                            {/* <div className="p-2 d-grid gap-3">
                              <button
                                className="btn btn-success"
                                type="submit"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                
                              >
                                Edit
                              </button>
                            </div> */}
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            onClick={() => {
                              navigate(`/address`, {
                                replace: true,
                              });
                            }}
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            onClick={(e) => handleSubmit(e)}
                            type="button"
                            className="btn btn-primary"
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressDetails;
