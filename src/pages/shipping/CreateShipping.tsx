import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import TableShipping from "../../components/table/TableShipping";
import { useTransactionStore } from "../../store";
import {
  Container,
  ContainerForm,
  IconGreen,
} from "../../styled-components/GlobalStyles";
import ShippingImage from "../../assets/shipping.png";
import { useStoreProfile } from "../../store-shipping";
import { useStoreAddress } from "../../store-address";

function CreateShipping() {
  const transactionState = useTransactionStore((state) => state);
  const userProfileState = useTransactionStore((state) => state);
  const { setFetchShipping, shippingDatas, dataFilter } = useStoreProfile();
  const { setFetchAddress, addressDatas, loading } = useStoreAddress();

  const [pages, setPage] = useState(1);

  const handlePrevPage = (prevPage: number) => {
    // console.log(prevPage);
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage);
    setPage((nextPage) => nextPage + 1);
  };
  console.log(dataFilter, "1111111111111111111111");
  useEffect(() => {
    transactionState.fetchUserTransactions();
    userProfileState.fetchUserProfiles();
  }, []);
  useEffect(() => {
    setFetchShipping(pages);
    setFetchAddress();
  }, []);
  console.log(addressDatas, "=========================");

  const [input, setInput] = useState({
    size_id: 0,
    category_id: 0,
    add_on_id: 0,
    address_id: 0,
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

    const ESizeId = document.getElementById("size_id") as HTMLSelectElement;
    const ECategoryId = document.getElementById(
      "category_id"
    ) as HTMLSelectElement;
    const EAddOnId = document.getElementById("add_on_id") as HTMLSelectElement;
    const EAddress = document.getElementById(
      "inputAddress"
    ) as HTMLSelectElement;

    transactionState.postCreateShipping({
      address_id: parseInt(EAddress.value),
      size_id: parseInt(ESizeId.value),
      category_id: parseInt(ECategoryId.value),
      add_on_id: parseInt(EAddOnId.value),
    });
  };

  return (
    <div className="container mt-5 p-5">
      <Header />
      <Link to="/shipping">
        <button className="btn btn-success">Back</button>
      </Link>
      <div className="container" style={{ marginTop: "5rem" }}>
        <div className="row justify-content-md-center">
          <div className="col xs lg-2">
            <div className="md-auto">
              <h2 className="d-flex justify-content-center fw-bold">
                Create New Shipping
              </h2>
              <form className="p-2" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label>Size</label>
                  <select
                    onChange={(e) => handleChange(e)}
                    defaultValue="1"
                    className="form-select"
                    id="size_id"
                    name="size_id"
                  >
                    <option value="1">Large</option>
                    <option value="2">Medium</option>
                    <option value="3">Small</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Category</label>
                  <select
                    onChange={(e) => handleChange(e)}
                    defaultValue="1"
                    className="form-select"
                    id="category_id"
                    name="category_id"
                  >
                    <option value="1">Food and Beverages</option>
                    <option value="2">Fragile</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Add On</label>
                  <select
                    onChange={(e) => handleChange(e)}
                    defaultValue="1"
                    className="form-select"
                    id="add_on_id"
                    name="add_on_id"
                  >
                    <option value="1">Safe Package</option>
                    <option value="2">Cooler</option>
                    <option value="3">Heatkeeper</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Address</label>

                  <select
                    onChange={(e) => handleChange(e)}
                    defaultValue="1"
                    className="form-select"
                    id="inputAddress"
                    name="address"
                  >
                    {addressDatas.map((a) => (
                      <option value={a.id}>
                        {a.full_address} - {a.recipient_name}
                      </option>
                    ))}
                  </select>
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
            <img src={ShippingImage} height="400px" alt="Shipping Image" />
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
                          Create Shipping Success
                        </h1>
                      </div>
                    </div>
                  </Container>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <Link to="/shipping">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateShipping;
