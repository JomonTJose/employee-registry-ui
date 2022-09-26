import axios from "axios";
import { EmployeeInfo } from "../models/user.model";

const API_URL = "http://localhost:3001/";

const login = async (email: string, password: string) => {
  const loginResponse = await axios.post(`${API_URL}auth/login`, {
    email,
    password,
  });
  console.log(loginResponse);
  return loginResponse;
};

const register = async (employee: EmployeeInfo) => {
  if (employee.password === "") {
    employee.password = "abcd1234";
  }
  const requestBody = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    role: employee.role,
    address1: employee.address1,
    address2: employee.address2,
    location: employee.location,
    country: employee.country,
    password: employee.password,
  };
  console.log(requestBody);
  const registerResponse = await axios.post(`${API_URL}employee`, requestBody);
  console.log(registerResponse);
  return registerResponse;
};
const authService = {
  login,
  register,
};

export default authService;
