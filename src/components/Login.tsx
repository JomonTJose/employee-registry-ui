import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../services/auth.service";
import { Form, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();

  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  const onSubmit = async (data: any) => {
    console.log(data.email, data.password);
    try {
      if (data.email && data.password) {
        let res = await authService.login(data.email, data.password);
        if (res.status === 200) {
          const accessToken = res.data.loginResponse.token;
          const user = res.data.loginResponse.employee;
          setAuth({
            user,
            accessToken,
          });
          navigate("/employee");
        }
      }
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response.status === 404) {
        setErrMsg("User Not Registered, Kindly Register");
      } else if (err?.response.status === 401) {
        setErrMsg("Invalid Username or Password");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <section>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <Form
        className="lg-6 sm-8"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
      >
        <Row>
          <Form.Group as={Col}>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && (
              <span style={{ color: "red" }}>*Email* is mandatory </span>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <span style={{ color: "red" }}>
                *Password* should be min 6 characters
              </span>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <button data-testid="submit">Sign In</button>

            <button
              data-testid="register"
              style={{ marginLeft: "20px" }}
              onClick={() =>
                navigate("/register", {
                  state: { hidePassword: false, title: "Register" },
                })
              }
            >
              Register
            </button>
          </Form.Group>
        </Row>
      </Form>
    </section>
  );
};

export default Login;
