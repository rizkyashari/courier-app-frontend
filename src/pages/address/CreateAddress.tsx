import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import TableShipping from "../../components/table/TableShipping";
import { useTransactionStore } from "../../store";
import {
  Container,
  ContainerForm,
  IconGreen,
  IconRed,
} from "../../styled-components/GlobalStyles";
import AddressImage from "../../assets/address.png";
import { useStoreAddress } from "../../store-address";

function CreateAddress() {
  const transactionState = useTransactionStore((state) => state);
  const userProfileState = useTransactionStore((state) => state);
  const { setFetchAddress, addressDatas, dataFilter } = useStoreAddress();

  console.log(dataFilter, "1111111111111111111111");
  useEffect(() => {
    transactionState.fetchUserTransactions();
    userProfileState.fetchUserProfiles();
  }, []);
  useEffect(() => {
    setFetchAddress();
  }, []);

  const [input, setInput] = useState({
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

    const EInputFullAddress = document.getElementById(
      "inputFullAddress"
    ) as HTMLInputElement;
    const EInputRecipientName = document.getElementById(
      "inputRecipientName"
    ) as HTMLInputElement;
    const EInputRecipientPhoneNumber = document.getElementById(
      "inputRecipientPhoneNumber"
    ) as HTMLInputElement;

    transactionState.postCreateAddress({
      full_address: EInputFullAddress.value,
      recipient_name: EInputRecipientName.value,
      recipient_phone_number: parseInt(EInputRecipientPhoneNumber.value),
    });
  };

  return (
    <div className="container mt-5 p-5">
      <Header />
      <Link to="/address">
        <button className="btn btn-success">Back</button>
      </Link>
      <div className="container" style={{ marginTop: "5rem" }}>
        <div className="row justify-content-md-center">
          <div className="col xs lg-2">
            <div className="md-auto">
              <h2 className="d-flex justify-content-center fw-bold">
                Create New Address
              </h2>
              <form className="p-2" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label>Full Address</label>
                  <input
                    className="form-control"
                    type="text"
                    name="full_address"
                    placeholder="Enter full address"
                    id="inputFullAddress"
                    onChange={(event) => handleChangeInput(event)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Recipient Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="recipient_name"
                    placeholder="Enter recipient name"
                    id="inputRecipientName"
                    onChange={(event) => handleChangeInput(event)}
                    required
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
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success"
                    type="submit"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    // onClick={(e) => handleSubmit(e)}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col xs lg-2 d-flex justify-content-end">
            <img src={AddressImage} height="400px" alt="Address Image" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col"></div>
          <ContainerForm>
            <div className="md-2"></div>
          </ContainerForm>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            {input.full_address == "" &&
            input.recipient_name == "" &&
            input.recipient_phone_number == 0 ? (
              <>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                      <Container>
                        <div className="d-flex justify-content-center flex-column mb-3">
                          <div className="p-2">
                            <IconRed>
                              <i className="bi bi-exclamation-triangle-fill"></i>
                            </IconRed>
                          </div>
                          <div className="p-2">
                            <h1
                              className="modal-title fs-5 d-flex justify-content-center text-center fw-bold"
                              id="exampleModalLabel"
                            >
                              Create Address Failed
                            </h1>
                            <div className="modal-body d-flex text-center text-danger">
                              <p>
                                Please input full address, recipient name, and
                                phone number
                              </p>
                            </div>
                          </div>
                        </div>
                      </Container>
                    </div>

                    <div className="modal-footer d-flex justify-content-center">
                      <Link to="/create-address">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                      <Container>
                        <div className="d-flex justify-content-center flex-column mb-3">
                          <div className="p-2">
                            <IconGreen>
                              <i className="bi bi-check-circle-fill"></i>
                            </IconGreen>
                          </div>
                          <div className="p-2">
                            <h1
                              className="modal-title fs-5 d-flex justify-content-center text-center fw-bold"
                              id="exampleModalLabel"
                            >
                              Create Address Success
                            </h1>
                          </div>
                        </div>
                      </Container>
                    </div>

                    <div className="modal-footer d-flex justify-content-center">
                      <Link to="/address">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAddress;
