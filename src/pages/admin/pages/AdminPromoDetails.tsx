import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { IPromoResponse, IShippingResponse } from "../../../interface";
import { useTransactionStore } from "../../../store";
import { useStorePromo } from "../../../store-promo";
import AdminNavbar from "../components/navbar/AdminNavbar";

function AdminPromoDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetch<IPromoResponse>(
    `http://localhost:8080/api/admin/promo/${id}`
  );
  const navigate = useNavigate();

  const transactionState = useTransactionStore((state) => state);
  const { setFetchPromo, promoDatas, dataFilter } = useStorePromo();

  console.log(dataFilter, "1111111111111111111111");

  useEffect(() => {
    setFetchPromo();
  }, []);

  const [input, setInput] = useState({
    id: 0,
    name: "",
    min_fee: 0,
    max_discount: 0,
    discount: 0,
    quota: 0,
    exp_date: "",
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

    const EPromoId = document.getElementById("id") as HTMLSelectElement;
    const EPromoName = document.getElementById("name") as HTMLInputElement;
    const EMinFee = document.getElementById("min_fee") as HTMLInputElement;
    const EMaxDiscount = document.getElementById(
      "max_discount"
    ) as HTMLInputElement;
    const EDiscount = document.getElementById("discount") as HTMLInputElement;
    const EQuota = document.getElementById("quota") as HTMLInputElement;
    const EXPDate = document.getElementById("exp_date") as HTMLInputElement;

    transactionState.putUpdatePromo({
      id: parseInt(EPromoId.value),
      name: EPromoName.value,
      min_fee: parseInt(EMinFee.value),
      max_discount: parseInt(EMaxDiscount.value),
      discount: parseInt(EDiscount.value),
      quota: parseInt(EQuota.value),
      exp_date: EXPDate.value,
    });
  };
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 overflow-auto flex-nowrap">
        <AdminNavbar />
        {error ? <p>Error</p> : null}
        {loading ? (
          <p>Loading</p>
        ) : (
          <div className="container col flex-column h-sm-100">
            <button
              onClick={() => {
                navigate(`/admin/promo`, {
                  replace: true,
                });
              }}
              className="mx-1 my-4 btn btn-success"
            >
              Back
            </button>
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                Details
              </div>
              <div className="card-body">
                <div className="d-flex">
                  <div className="p-2 flex-grow-1">
                    <h5 className="card-title">Promo ID</h5>
                    <p>{id}</p>
                    <h5 className="card-title">Promo Name</h5>
                    <p>{data?.data.name}</p>
                    <h5 className="card-title">Minimum Fee</h5>
                    <p>IDR {data?.data.min_fee}</p>
                    <h5 className="card-title">Maximum Discount</h5>
                    <p>IDR {data?.data.max_discount}</p>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title">Discount</h5>
                    <p>{data?.data.discount}%</p>
                    <h5 className="card-title">Quota</h5>
                    <p>{data?.data.quota}</p>
                    <h5 className="card-title">Exp. Date</h5>
                    <p>{data?.data.exp_date}</p>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit Promo
                  </button>
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
                            Edit Promo
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
                            <label>Promo ID</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={id}
                              className="form-select"
                              id="id"
                              name="id"
                              disabled
                            >
                              <option value={id}>{id}</option>
                            </select>
                            <label>Promo Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              placeholder="Edit promo name..."
                              id="name"
                              onChange={(event) => handleChangeInput(event)}
                            />
                            <label>Minimum Fee</label>
                            <input
                              className="form-control"
                              type="number"
                              name="min_fee"
                              placeholder="Edit minimum fee..."
                              id="min_fee"
                              onChange={(event) => handleChangeInput(event)}
                            />
                            <label>Maximum Discount</label>
                            <input
                              className="form-control"
                              type="number"
                              name="max_discount"
                              placeholder="Edit maximum discount..."
                              id="max_discount"
                              onChange={(event) => handleChangeInput(event)}
                            />
                            <label>Discount</label>
                            <input
                              className="form-control"
                              type="number"
                              name="discount"
                              placeholder="Edit discount..."
                              id="discount"
                              onChange={(event) => handleChangeInput(event)}
                            />
                            <label>Quota</label>
                            <input
                              className="form-control"
                              type="number"
                              name="quota"
                              placeholder="Edit quota..."
                              id="quota"
                              onChange={(event) => handleChangeInput(event)}
                            />
                            <label>Exp Date (YYYY-MM-DD)</label>
                            <input
                              className="form-control"
                              type="text"
                              name="exp_date"
                              placeholder="Edit exp_date..."
                              id="exp_date"
                              onChange={(event) => handleChangeInput(event)}
                            />
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            onClick={() => {
                              navigate(`/admin/promo`, {
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
        )}
      </div>
    </div>
  );
}

export default AdminPromoDetails;
