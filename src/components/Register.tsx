import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../services/auth.service";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { EmployeeInfo } from "../models/user.model";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomModal from "./Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { registerFormSchema } from "../models/registerForm.schema";

export type TModelRegisterFormInputs = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  role: string;
  address1: string;
  address2: string;
  location: string;
  country: string;
};
const Register = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  const { hidePassword, title }: any = state;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [registerErrorContent, setRegisterErrorContent] = useState<string>("");
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerFormSchema),
    mode: "onChange",
  });
  const { errors } = formState;
  const [showError, setShowError] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    if (data.email && data.password) {
      let newEmployee: EmployeeInfo = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        address1: data.address1,
        address2: data.addreess2,
        location: data.location,
        country: data.country,
        role: data.role,
      };
      let res = authService.register(newEmployee);
      res
        .then((data: any) => {
          if (data.status === 200) {
            setOpenModal(true);
            if (!hidePassword) {
              setTimeout(() => {
                closeModal();
                navigate("/");
              }, 2000);
            } else {
              setTimeout(() => {
                closeModal();
                navigate("/employee");
              }, 2000);
            }
          } else {
            setShowError(true);
            setRegisterErrorContent(data.response.data);
          }
        })
        .catch((err: any) => {
          setShowError(true);
          setRegisterErrorContent(err?.response?.data?.message);
          console.log(
            `Error while Registration: ${err?.response?.data?.message}`
          );
        });
    }
  };

  const goBack = () => {
    if (!hidePassword) {
      navigate("/");
    } else {
      navigate("/employee");
    }
  };
  const closeModal = () => {
    setOpenModal(false);
    setShowError(false);
  };
  return (
    <div data-testid="registersection" className="col-md-12 col-md-offset-12">
      <h1> {title}</h1>

      {showError && (
        <CustomModal
          showModal={showError}
          content={registerErrorContent}
          size="sm"
          title={"Employee Registration Failed"}
          closeModal={closeModal}
        />
      )}
      {!hidePassword ? (
        <CustomModal
          showModal={openModal}
          content={"Employee Registered successfully"}
          size="sm"
          title={"Registration Successful"}
          closeModal={closeModal}
        />
      ) : (
        <CustomModal
          showModal={openModal}
          content={"Employee Added successfully"}
          size="sm"
          title={"Employee Added Succesfully"}
          closeModal={closeModal}
        />
      )}

      <Form
        className="lg-6 sm-8"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
      >
        <Row>
          <Form.Group as={Col}>
            <label htmlFor="email">Email</label>
            <input type={"email"} {...register("email", { required: true })} />
            <span>
              {errors.email && (
                <span style={{ color: "red" }}>*Email* is mandatory </span>
              )}
            </span>
          </Form.Group>
          <Form.Group as={Col}>
            <label htmlFor="role">Role</label>
            <input type="text" {...register("role")} />
            {errors.role && (
              <span style={{ color: "red" }}>*Role* is required</span>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" {...register("firstName")} />
            {errors.firstName && (
              <span style={{ color: "red" }}>*FirstName* is mandatory </span>
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" {...register("lastName")} />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password")}
              defaultValue="abcd1234"
            />
            {errors.password && (
              <span style={{ color: "red" }}>
                *Password* should be min 6 characters
              </span>
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              defaultValue="abcd1234"
            />
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>*Passwords* do not match</span>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <label htmlFor="address1">Address 1</label>
            <input type="text" {...register("address1")} />
            {errors.address1 && (
              <span style={{ color: "red" }}>*Address Line 1* is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <label htmlFor="address2">Address 2</label>
            <input type="text" {...register("address2")} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <label htmlFor="State">State</label>
            <input type="text" {...register("location")} />
            {errors.location && (
              <span style={{ color: "red" }}>*State* is required</span>
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <label htmlFor="Country">Country</label>
            <input type={"text"} {...register("country")} />
            {errors.country && (
              <span style={{ color: "red" }}>*Country* is required</span>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <input className="btn btn-success" type="submit" value={title} />
            <Button
              className="btn btn-success"
              onClick={goBack}
              style={{ marginLeft: "20px" }}
            >
              Cancel
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
