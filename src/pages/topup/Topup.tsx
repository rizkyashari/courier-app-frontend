import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Balance from "../../components/balance/Balance";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useTransactionStore } from "../../store";
import {
  ContainerForm,
  IconGreen,
  IconRed,
} from "../../styled-components/GlobalStyles";

function Topup() {
  const transactionState = useTransactionStore((state) => state);
  const userProfileState = useTransactionStore((state) => state);

  useEffect(() => {
    transactionState.fetchUserTransactions();
    userProfileState.fetchUserProfiles();
  }, []);

  const [input, setInput] = useState({
    amount: 0,
    source_of_fund_id: 0,
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

    const ESourceOfFundId = document.getElementById(
      "source_of_fund_id"
    ) as HTMLSelectElement;
    const EInputAmount = document.getElementById(
      "inputAmount"
    ) as HTMLInputElement;

    transactionState.postUserTopUpTransactions({
      amount: parseInt(EInputAmount.value),
      source_of_fund_id: parseInt(ESourceOfFundId.value),
    });
  };

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5 p-5">
        <Balance />
        <div className="container mb-5">
          <div className="row justify-content-md-center">
            <div className="col"></div>
            <ContainerForm>
              <div className="md-2">
                <h2 className="d-flex justify-content-center fw-bold">
                  Top Up
                </h2>
                <form className="p-2">
                  <div className="mb-3">
                    <label>From</label>
                    <select
                      onChange={(e) => handleChange(e)}
                      defaultValue="1"
                      className="form-select"
                      id="source_of_fund_id"
                      name="source_of_fund_id"
                      required
                    >
                      <option value="1">Bank</option>
                      <option value="2">Cash</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Amount</label>
                    <input
                      className="form-control"
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                      id="inputAmount"
                      onChange={(event) => handleChangeInput(event)}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="p-2 d-grid gap-3">
                <button
                  className="btn btn-success"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={(e) => handleSubmit(e)}
                >
                  Top Up
                </button>
              </div>
            </ContainerForm>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              {input.amount == 0 ? (
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
                                Top Up Failed
                              </h1>
                              <div className="modal-body d-flex justify-content-center text-center text-danger">
                                <p>Please input amount</p>
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
                                Top Up Success
                              </h1>
                            </div>
                          </div>
                        </Container>
                      </div>
                      <div className="modal-body d-flex justify-content-center">
                        <div className="row">
                          <div className="col">
                            <p>Amount</p>
                          </div>
                          <div className="col">
                            <p>{input.amount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer d-flex justify-content-center">
                        <Link to="/home">
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
            <div className="col"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Topup;
