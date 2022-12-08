import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTransactionStore } from "../../../store";
import {
  Container,
  ContainerForm,
  IconGreen,
} from "../../../styled-components/GlobalStyles";
import AdminNavbar from "../components/navbar/AdminNavbar";
import ProfileImage from "../../../assets/profile.png";

function AdminEditProfile() {
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

  useEffect(() => {
    transactionState.fetchUserTransactions();
    userProfileState.fetchUserProfiles();
  }, []);

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone_number: 0,
    photos: "",
  });

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

  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 flex-nowrap overflow-auto">
        <AdminNavbar />
        <div className="container col d-flex flex-column h-sm-100">
          <Link to="/admin/profile">
            <button className="btn btn-success">Back</button>
          </Link>
          <div className="container" style={{ marginTop: "5rem" }}>
            <div className="row justify-content-md-center">
              <div className="col xs lg-2">
                <div className="md-auto">
                  <h2 className="d-flex justify-content-center fw-bold">
                    Edit Profile
                  </h2>
                  <form className="p-2">
                    <div className="mb-3">
                      <label>Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter your name..."
                        id="inputName"
                        onChange={(event) => handleChangeInput(event)}
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
                        onChange={(event) => handleChangeInput(event)}
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
                        onChange={(event) => handleChangeInput(event)}
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
                    <div className="p-2 d-grid gap-3">
                      <button
                        className="btn btn-success"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col xs lg-2 d-flex justify-content-end">
                <img src={ProfileImage} height="400px" alt="Profile Image" />
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
                              Edit Profile Success
                            </h1>
                          </div>
                        </div>
                      </Container>
                    </div>
                    <div className="modal-body d-flex justify-content-center">
                      <div className="row">
                        <div className="col">
                          <p>Name</p>
                          <p>Email</p>
                          <p>Phone Number</p>
                        </div>
                        <div className="col">
                          <p>{input.name}</p>
                          <p>{input.email}</p>
                          <p>{input.phone_number}</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                      <button type="button" className="btn btn-primary">
                        Print
                      </button>
                      <Link to="/admin/profile">
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
      </div>
    </div>
  );
}

export default AdminEditProfile;
