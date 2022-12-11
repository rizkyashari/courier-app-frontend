import React, { FormEvent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import { IShippingResponse } from "../../interface";
import { useTransactionStore } from "../../store";
import { useStoreProfile } from "../../store-shipping";
import {
  ContainerForm,
  IconGreen,
  IconRed,
} from "../../styled-components/GlobalStyles";
import ShippingImage from "../../assets/payment.png";
import Balance from "../../components/balance/Balance";
import { useStoreUserPromo } from "../../store-user-promo";

function Payment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useFetch<IShippingResponse>(
    `https://courier-app-backend-production.up.railway.app/api/user/shipping/${id}`
  );
  const [pages, setPage] = useState(1);
  let total = 0;
  if (data?.data.add_on.price) {
    total =
      data?.data.add_on.price +
      data?.data.size.price +
      data.data.category.price;
  }

  const handlePrevPage = (prevPage: number) => {
    // console.log(prevPage);
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage);
    setPage((nextPage) => nextPage + 1);
  };

  console.log("data listCustom", data);
  console.log(data?.data.size.price, "=========================");

  const transactionState = useTransactionStore((state) => state);
  const userProfileState = useTransactionStore((state) => state);
  const { setFetchShipping, shippingDatas, dataFilter } = useStoreProfile();
  const { setFetchUserPromo, userPromoDatas } = useStoreUserPromo();

  console.log(userPromoDatas, "===================");
  console.log(dataFilter, "1111111111111111111111");
  useEffect(() => {
    transactionState.fetchUserTransactions();
    userProfileState.fetchUserProfiles();
  }, []);
  useEffect(() => {
    setFetchShipping(pages);
    setFetchUserPromo();
  }, []);

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

    const EShippingId = document.getElementById(
      "shipping_id"
    ) as HTMLSelectElement;
    const EUserPromoId = document.getElementById(
      "user_promo_id"
    ) as HTMLSelectElement;

    transactionState.postCreatePayment({
      shipping_id: parseInt(EShippingId.value),
      user_promo_id: parseInt(EUserPromoId.value),
    });
  };
  return (
    <div className="container mt-5 p-5">
      <Header />
      <div className="mt-3 d-flex justify-content-center justify-content-lg-start">
        <button
          onClick={() => {
            navigate(`/shipping/${id}`, {
              replace: true,
            });
          }}
          className="btn btn-success d-flex justify-content-center"
        >
          Back
        </button>
      </div>
      <Balance />
      {error ? <p>Error</p> : null}
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          <div className="container" style={{ marginTop: "5rem" }}>
            <div className="row justify-content-md-center">
              <div className="col-lg-6 col-xs-12">
                <div className="md-auto">
                  <h2 className="d-flex justify-content-center fw-bold">
                    Payment
                  </h2>
                  <form className="p-2">
                    <div className="mb-3">
                      <label>Shipping ID</label>
                      <select
                        onChange={(e) => handleChange(e)}
                        defaultValue={id}
                        className="form-select"
                        id="shipping_id"
                        name="shipping_id"
                        disabled
                      >
                        <option value={id}>{id}</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Choose Promo</label>
                      <select
                        onChange={(e) => handleChange(e)}
                        defaultValue="0"
                        className="form-select"
                        id="user_promo_id"
                        name="user_promo_id"
                      >
                        <option value="0">No Promo</option>
                        {userPromoDatas.map((a) => (
                          <>
                            {a.status == 0 ? (
                              <option value={a.id}>
                                {a.id} - {a.promo.name}
                              </option>
                            ) : (
                              <></>
                            )}
                          </>
                        ))}
                        {/* <option value="1">40% Discount Vouchers</option>
                        <option value="2">60% Discount Vouchers</option>
                        <option value="3">60% Discount Vouchers</option> */}
                      </select>
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-success"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Pay {total}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-xs-12 ">
                <img
                  src={ShippingImage}
                  className="img-fluid"
                  alt="Shipping Image"
                />
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
                {total > userProfileState.userProfiles.balance ? (
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
                                  Payment Failed
                                </h1>
                                <div className="modal-body d-flex justify-content-center text-center text-danger">
                                  <p>Insufficient Balance</p>
                                </div>
                              </div>
                            </div>
                          </Container>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                          <Link to="/top-up">
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
                                  Payment Success
                                </h1>
                              </div>
                            </div>
                          </Container>
                        </div>
                        <div className="modal-body d-flex justify-content-center"></div>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
