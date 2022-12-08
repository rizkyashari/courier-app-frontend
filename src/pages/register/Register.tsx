import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "axios";
import {
  Container,
  ContainerForm,
  IconGreen,
  IconRed,
} from "../../styled-components/GlobalStyles";
import HeaderLoginRegister from "../../components/header/HeaderLoginRegister";
import RegisterImage from "../../assets/register.png";

function Register() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    password: "",
    email: "",
    phone_number: 0,
    referral_code: "",
  });

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget);
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // console.log(input);
      let response = await axios.post(
        "https://courier-app-backend-production.up.railway.app/api/auth/register",
        {
          name: input.name,
          email: input.email,
          password: input.password,
          phone_number: input.phone_number,
          referral_code: input.referral_code,
        }
      );
      console.log(response);
      navigate("/login", { replace: true });
      localStorage.setItem("id_token", JSON.stringify(response.data));
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <div className="container register">
      <HeaderLoginRegister />
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col xs lg-2">
            <div className="md-2">
              <h2 className="d-flex justify-content-center fw-bold">
                Register
              </h2>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter your username..."
                    onChange={(event) => handleChange(event)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Enter password..."
                    onChange={(event) => handleChange(event)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    onChange={(event) => handleChange(event)}
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
                    onChange={(event) => handleChange(event)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Referral Code</label>
                  <input
                    className="form-control"
                    type="text"
                    name="referral_code"
                    placeholder="Enter referral code.."
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success"
                    type="submit"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Register
                  </button>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                  <p className="small-text">
                    Already have an account?{""}
                    <Link to="/login" className="text-black">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              {input.email == "" || input.name == "" || input.password == "" ? (
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
                                Registration Failed
                              </h1>
                              <div className="modal-body d-flex text-center text-danger">
                                <p>
                                  Please input mandatory tags (name, email, and
                                  password)
                                </p>
                              </div>
                            </div>
                          </div>
                        </Container>
                      </div>

                      <div className="modal-footer d-flex justify-content-center">
                        <Link to="/register">
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
                                Registration Success
                              </h1>
                            </div>
                          </div>
                        </Container>
                      </div>

                      <div className="modal-footer d-flex justify-content-center">
                        <Link to="/login">
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
          <div className="col xs lg-2 d-flex justify-content-end">
            <img src={RegisterImage} height="400px" alt="Register Image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
