import {
  Card,
  Typography,
  CardContent,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { EmployeeInfo } from "../../models/user.model";
import employeeService from "../../services/employee.service";
import classes from "./styles.module.css";

const Employee = () => {
  const [employee, setEmployee] = useState<EmployeeInfo>({
    address1: "",
    address2: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    location: "",
    role: "",
    password: "",
  });
  const { state }: any = useLocation();
  let navigate = useNavigate();
  const { email } = state;
  const loadEmployeebyEmail = async () => {
    const employee: any = await employeeService.getEmployeeByEmail(email);

    setEmployee(employee.employeeList);
    console.log(employee);
  };

  const goBack = () => {
    navigate("/employees");
  };
  useEffect(() => {
    loadEmployeebyEmail();
  }, []);
  return (
    employee && (
      <div className={classes.wrapper}>
        <Typography variant="h5" align="center" style={{ marginBottom: 20 }}>
          Employee Details
        </Typography>
        <Card>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell variant="head" component="th" width="200">
                    Name
                  </TableCell>
                  <TableCell>
                    {employee.firstName + " " + employee.lastName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Email
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Address
                  </TableCell>
                  <TableCell>
                    {employee.address1 + "\n" + employee.address2}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Location/State
                  </TableCell>
                  <TableCell>{employee.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Country
                  </TableCell>
                  <TableCell>{employee.country}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" component="th">
                    Role
                  </TableCell>
                  <TableCell>{employee.role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <button className="btn btn-primary" onClick={goBack}>
                      Cancel
                    </button>
                  </TableCell>
                  <TableCell>
                    <button className="btn btn-primary" disabled>
                      Update
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default Employee;
