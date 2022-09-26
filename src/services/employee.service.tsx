import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/";

const getAllEmployees = async () => {
  const allEmpResponse = await axios.get(`${API_URL}employee`);
  if (allEmpResponse.status === 200) {
    console.log(allEmpResponse.data.employeeList);
    return allEmpResponse.data.employeeList;
  }
};

const getEmployeeByEmail = async (email: string) => {
  const empResponse = await fetch(`${API_URL}employee/byemail?email=${email}`, {
    method: "GET",
  });
  return empResponse.json();
};

const deleteEmployeeByEmail = async (email: string) => {
  const allEmpResponse = await axios.delete(
    `${API_URL}employee?email=${email}`
  );
  if (allEmpResponse.status === 201) {
    return allEmpResponse;
  }
};
const employeeService = {
  getAllEmployees,
  getEmployeeByEmail,
  deleteEmployeeByEmail,
};

export default employeeService;
