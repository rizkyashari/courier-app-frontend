import React, { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import TableShipping from "../../components/table/TableShipping";
import { useTransactionStore } from "../../store";
import {
  Container,
  ContainerForm,
  IconGreen,
  IconRed,
} from "../../styled-components/GlobalStyles";
import ProfileImage from "../../assets/profile.png";
import { useStoreAddress } from "../../store-address";
import useFetch from "../../hooks/useFetch";
import { IUpdateProfile } from "../../interface";

function EditProfile() {
  const [media, setMedia] = useState<File[]>([]);
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = [...Object.values(target.files!)];
    setMedia([...files]);
  };

  const uploadImage = async (files: File[]) => {
    const media = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gfzvnxon");
      formData.append("cloud_name", "dmlzx9yxe");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dmlzx9yxe/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        media.push(data.secure_url);
        console.log(data.secure_url);
      } catch (err: any) {
        console.log(err);
      }
    }
    return media;
  };
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
    name: "",
    email: "",
    phone_number: 0,
    photos: "",
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

    const EInputName = document.getElementById("inputName") as HTMLInputElement;
    const EInputEmail = document.getElementById(
      "inputEmail"
    ) as HTMLInputElement;
    const EInputPhoneNumber = document.getElementById(
      "inputPhoneNumber"
    ) as HTMLInputElement;
    const EInputPhoto = document.getElementById(
      "inputPhoto"
    ) as HTMLInputElement;

    let res = uploadImage(media);
    res.then(function (result) {
      transactionState.putUpdateProfile({
        id: 0,
        name: EInputName.value,
        email: EInputEmail.value,
        phone_number: parseInt(EInputPhoneNumber.value),
        photos: result[0],
      });
    });
  };

  const [formInputName, setFormInputName] = useState(
    userProfileState.userProfiles.name
  );
  const [formInputEmail, setFormInputEmail] = useState(
    userProfileState.userProfiles.email
  );
  const [formInputPhone, setFormInputPhone] = useState(
    userProfileState.userProfiles.phone_number
  );

  console.log(formInputName, "GDDUYDDDDDDDDDDDD");
  return (
    <div className="container mt-5 p-5">
      <Header />
      <Link to="/profile">
        <button className="btn btn-success">Back</button>
      </Link>
      <div className="container" style={{ marginTop: "5rem" }}>
        <div className="row justify-content-md-center">
          <div className="col xs lg-2">
            <div className="md-auto">
              <h2 className="d-flex justify-content-center fw-bold">
                Edit Profile
              </h2>
              <form className="p-2" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter your name..."
                    id="inputName"
                    // onChange={(event) => handleChangeInput(event)}
                    onChange={(e) => setFormInputName(e.target.value)}
                    value={formInputName}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Enter your email..."
                    id="inputEmail"
                    // onChange={(event) => handleChangeInput(event)}
                    onChange={(e) => setFormInputEmail(e.target.value)}
                    value={formInputEmail}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input
                    className="form-control"
                    type="number"
                    name="phone_number"
                    placeholder="Enter your phone number..."
                    id="inputPhoneNumber"
                    // onChange={(event) => handleChangeInput(event)}
                    onChange={(e) =>
                      setFormInputPhone(parseInt(e.target.value))
                    }
                    value={formInputPhone}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Photo
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="inputPhoto"
                    onChange={(e) => handleChangeImage(e)}
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
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col xs lg-2 d-flex justify-content-end">
            <img src={ProfileImage} height="400px" alt="Address Image" />
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
            {formInputEmail == "" ||
            formInputName == "" ||
            formInputPhone == 0 ? (
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
                              Edit Profile Failed
                            </h1>
                          </div>
                        </div>
                      </Container>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                      <Link to="/edit-profile">
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
                              Edit Profile Success
                            </h1>
                          </div>
                        </div>
                      </Container>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                      <button type="button" className="btn btn-primary">
                        Print
                      </button>
                      <Link to="/profile">
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

export default EditProfile;
