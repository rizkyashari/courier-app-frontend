import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { IShippingResponse } from "../../../interface";
import { useTransactionStore } from "../../../store";
import { useStoreProfile } from "../../../store-shipping";
import AdminNavbar from "../components/navbar/AdminNavbar";

function AdminShippingDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetch<IShippingResponse>(
    `http://localhost:8080/api/user/shipping/${id}`
  );
  const [pages, setPage] = useState(1);

  const handlePrevPage = (prevPage: number) => {
    // console.log(prevPage);
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage);
    setPage((nextPage) => nextPage + 1);
  };
  const navigate = useNavigate();
  console.log("data listCustom", data);
  console.log(data?.data.size.price, "=========================");

  const transactionState = useTransactionStore((state) => state);
  const userProfileState = useTransactionStore((state) => state);
  const { setFetchShipping, shippingDatas, dataFilter } = useStoreProfile();

  // console.log(addressDatas[0].full_address, "===================");
  console.log(dataFilter, "1111111111111111111111");

  useEffect(() => {
    setFetchShipping(pages);
  }, [pages]);

  const [input, setInput] = useState({
    id: 0,
    user_id: 0,
    address_id: 0,
    payment_id: 0,
    size_id: 0,
    category_id: 0,
    add_on_id: 0,
    shipping_status: "",
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

    const EShippingId = document.getElementById("id") as HTMLSelectElement;
    const EUserId = document.getElementById("user_id") as HTMLSelectElement;
    const EAddressId = document.getElementById(
      "address_id"
    ) as HTMLSelectElement;
    const EPaymentId = document.getElementById(
      "payment_id"
    ) as HTMLSelectElement;
    const ESizeId = document.getElementById("size_id") as HTMLSelectElement;
    const ECategoryId = document.getElementById(
      "category_id"
    ) as HTMLSelectElement;
    const EAddOnId = document.getElementById("add_on_id") as HTMLSelectElement;
    const EShippingStatus = document.getElementById(
      "shipping_status"
    ) as HTMLSelectElement;

    transactionState.putUpdateShippingStatus({
      id: parseInt(EShippingId.value),
      user_id: parseInt(EUserId.value),
      address_id: parseInt(EAddressId.value),
      payment_id: parseInt(EPaymentId.value),
      size_id: parseInt(ESizeId.value),
      category_id: parseInt(ECategoryId.value),
      add_on_id: parseInt(EAddOnId.value),
      shipping_status: EShippingStatus.value,
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
                navigate(`/admin/shipping`, {
                  replace: true,
                });
              }}
              className="mx-1 my-4 btn btn-success"
            >
              Back
            </button>
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                Shipping Details
              </div>
              <div className="card-body">
                <div className="d-flex">
                  <div className="p-2 flex-grow-1">
                    <h5 className="card-title">Shipping ID</h5>
                    <p>{id}</p>
                    <h5 className="card-title">User or Sender Name</h5>
                    <p>{data?.data.user.name}</p>
                    <h5 className="card-title">Recipient Name</h5>
                    <p>{data?.data.address.recipient_name}</p>
                    <h5 className="card-title">Destination Address</h5>
                    <p>{data?.data.address.full_address}</p>
                    <h5 className="card-title">Shipping Status</h5>
                    {data?.data.shipping_status === "Waiting for payment" ? (
                      <div>
                        <p className="fs-4 px-2 border-start border-success border-5 text-success">
                          Waiting for payment
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Paid: delivery is being prepared
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is arrived in sorting warehouse
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is being delivered to destination address
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is arrived in destination address: done
                        </p>
                      </div>
                    ) : data?.data.shipping_status ===
                      "Paid: delivery is being prepared" ? (
                      <div>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Waiting for payment
                        </p>
                        <p className="fs-4 px-2 border-start border-success border-5 text-success">
                          Paid: delivery is being prepared
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is arrived in sorting warehouse
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is being delivered to destination address
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is arrived in destination address: done
                        </p>
                      </div>
                    ) : data?.data.shipping_status ===
                      "Package is arrived in sorting warehouse" ? (
                      <div>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Waiting for payment
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Paid: delivery is being prepared
                        </p>
                        <p className="fs-4 px-2 border-start border-success border-5 text-success">
                          Package is arrived in sorting warehouse
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is being delivered to destination address
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is arrived in destination address: done
                        </p>
                      </div>
                    ) : data?.data.shipping_status ===
                      "Package is being delivered to destination address" ? (
                      <div>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Waiting for payment
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Paid: delivery is being prepared
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is arrived in sorting warehouse
                        </p>
                        <p className="fs-4 px-2 border-start border-success border-5 text-success">
                          Package is being delivered to destination address
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is arrived in destination address: done
                        </p>
                      </div>
                    ) : data?.data.shipping_status ===
                      "Package is arrived in destination address: done" ? (
                      <div>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Waiting for payment
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Paid: delivery is being prepared
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is arrived in sorting warehouse
                        </p>
                        <p className="px-2 border-start border-muted border-5 text-muted">
                          Package is being delivered to destination address
                        </p>
                        <p className="fs-4 px-2 border-start border-success border-5 text-success">
                          Package is arrived in destination address: done
                        </p>
                      </div>
                    ) : (
                      <p className="px-2 border-start border-success border-5 text-success">
                        {data?.data.shipping_status}
                      </p>
                    )}
                  </div>
                  <div className="p-2">
                    <h5 className="card-title">Size</h5>
                    <p>{data?.data.size.name}</p>
                    <h5 className="card-title">Category</h5>
                    <p>{data?.data.category.name}</p>
                    <h5 className="card-title">Add On</h5>
                    <p>{data?.data.add_on.name}</p>
                  </div>
                  <div className="p-2">
                    <h5 className="card-title">Price</h5>
                    <p>IDR {data?.data.size.price}</p>
                    <h5 className="card-title">Price</h5>
                    <p>IDR {data?.data.category.price}</p>
                    <h5 className="card-title">Price</h5>
                    <p>IDR {data?.data.add_on.price}</p>
                    <h5 className="card-title">Total Cost</h5>
                    <p>IDR {data?.data.add_on.price}</p>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit Shipping Status
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
                            Edit Shipping Status
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
                            <label>Shipping ID</label>
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
                            <label>User or Sender Name</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={data?.data.user.id}
                              className="form-select"
                              id="user_id"
                              name="user_id"
                              disabled
                            >
                              <option value={data?.data.user.id}>
                                {data?.data.user.name}
                              </option>
                            </select>
                            <label>Recipient Name</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={data?.data.address.id}
                              className="form-select"
                              id="address_id"
                              name="address_id"
                              disabled
                            >
                              <option value={data?.data.address.id}>
                                {data?.data.address.recipient_name}
                              </option>
                            </select>
                            <label>Payment ID</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={data?.data.payment.id}
                              className="form-select"
                              id="payment_id"
                              name="payment_id"
                              disabled
                            >
                              <option value={data?.data.payment.id}>
                                {data?.data.payment.id}
                              </option>
                            </select>
                            <label>Size</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={data?.data.size.id}
                              className="form-select"
                              id="size_id"
                              name="size_id"
                              disabled
                            >
                              <option value={data?.data.size.id}>
                                {data?.data.size.name}
                              </option>
                            </select>
                            <label>Category</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={data?.data.category.id}
                              className="form-select"
                              id="category_id"
                              name="category_id"
                              disabled
                            >
                              <option value={data?.data.category.id}>
                                {data?.data.category.name}
                              </option>
                            </select>
                            <label>Add On</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={data?.data.add_on.id}
                              className="form-select"
                              id="add_on_id"
                              name="add_on_id"
                              disabled
                            >
                              <option value={data?.data.add_on.id}>
                                {data?.data.add_on.name}
                              </option>
                            </select>
                            <label>Shipping Status</label>
                            <select
                              onChange={(e) => handleChange(e)}
                              defaultValue={data?.data.shipping_status}
                              className="form-select"
                              id="shipping_status"
                              name="shipping_status"
                            >
                              <option value="Waiting for payment">
                                Waiting for payment
                              </option>
                              <option value="Paid: delivery is being prepared">
                                Paid: delivery is being prepared
                              </option>
                              <option value="Package is arrived in sorting warehouse">
                                Package is arrived in sorting warehouse
                              </option>
                              <option value="Package is being delivered to destination address">
                                Package is being delivered to destination
                                address
                              </option>
                              <option value="Package is arrived in destination address: done">
                                Package is arrived in destination address: done
                              </option>
                            </select>
                            {/* <input
                              className="form-control"
                              type="text"
                              name="shipping_status"
                              placeholder="Edit shipping status..."
                              id="shipping_status"
                              onChange={(event) => handleChangeInput(event)}
                            /> */}
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            onClick={() => {
                              navigate(`/admin/shipping`, {
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

export default AdminShippingDetails;
