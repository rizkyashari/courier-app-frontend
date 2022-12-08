import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ContainerForm } from "../../styled-components/GlobalStyles";
import HeaderLoginRegister from "../../components/header/HeaderLoginRegister";
import LoginImage from "../../assets/login.png";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let user = await axios.post(
        "https://courier-app-backend-production.up.railway.app/api/auth/login",
        {
          email: input.email,
          password: input.password,
        }
      );

      if (user.data.data.role == "Admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

      localStorage.setItem("id_token", user.data.data.token);
      console.log(user.data);
    } catch (error) {
      console.log(error);
      alert("Incorrect email or password");
    }
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <div className="container login">
      <HeaderLoginRegister />

      <div className="container" style={{ marginTop: "5rem" }}>
        <div className="row justify-content-md-center">
          {/* <div className="col xs lg-2"></div> */}
          <div className="col xs lg-2">
            <div className="md-auto">
              <h2 className="mb-3 d-flex justify-content-center fw-bold">
                Login
              </h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Enter your username..."
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-success" type="submit">
                    Login
                  </button>
                </div>
                <div className="mt-3 d-flex justify-content-center">
                  <p className="small-text">
                    Don't have an account?{""}
                    <Link to="/register" className="text-black">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="col xs lg-2 d-flex justify-content-end">
            <img src={LoginImage} height="400px" alt="Login Image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
