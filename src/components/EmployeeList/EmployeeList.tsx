import React, { useEffect, useState } from "react";
import { EmployeeInfo } from "../../models/user.model";
import employeeService from "../../services/employee.service";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColDef,
} from "@mui/x-data-grid";
import classes from "./styles.module.css";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../Modal";

const EmployeeList = () => {
  const { auth } = useAuth();
  const { user } = auth;
  const [showDeletedModal, setDeletedModal] = useState<boolean>(false);
  const [employeeList, setEmployeeList] = useState<EmployeeInfo[]>([]);
  const [pageSize, setPageSize] = React.useState<number>(10);
  let navigate = useNavigate();

  const fetchAllEmployees = async () => {
    const employeeRes = await employeeService.getAllEmployees();
    console.log(employeeRes);
    setEmployeeList(employeeRes);
  };
  useEffect(() => {
    fetchAllEmployees().catch(console.error);
  }, []);

  const addNewEmployee = () => {
    navigate("/register", {
      state: { hidePassword: true, title: "Add New Employee" },
    });
  };

  const columns: GridColDef[] = [
    {
      field: "firstname",
      headerName: "First name",
      sortable: true,
      width: 125,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      field: "lastName",
      headerName: "Last name",
      sortable: true,
      width: 125,
      minWidth: 150,
      maxWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 200,
      minWidth: 150,
      maxWidth: 220,
    },
    {
      field: "address1",
      headerName: "Address 1",
      width: 200,
      minWidth: 150,
      maxWidth: 220,
    },
    {
      field: "role",
      headerName: "Role",
      sortable: true,
      width: 100,
      minWidth: 50,
      maxWidth: 120,
    },
    {
      field: "location",
      headerName: "State",
      sortable: true,
      width: 200,
      minWidth: 150,
      maxWidth: 220,
    },
    {
      field: "country",
      headerName: "Country",
      sortable: true,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 300,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event: any) => {
                viewEmployeebyEmail(event, cellValues);
              }}
            >
              View
            </Button>
            {user ? (
              <Button
                style={{ marginLeft: "10px" }}
                variant="outlined"
                color="primary"
                startIcon={<DeleteIcon />}
                onClick={(event: any) => {
                  handleDelete(event, cellValues);
                }}
              ></Button>
            ) : null}
          </div>
        );
      },
    },
  ];

  const handleDelete = async (event: any, row: any) => {
    const deletedEmp: any = await employeeService.deleteEmployeeByEmail(
      row.row.email
    );

    if (deletedEmp.status === 201) {
      setDeletedModal(true);
      setTimeout(() => {
        setDeletedModal(false);
      }, 2000);
      setEmployeeList([]);
      fetchAllEmployees();
    }
  };

  const viewEmployeebyEmail = (event: any, row: any) => {
    console.log(row.row.email);
    event.preventDefault();
    navigate("/employees/employee", { state: { email: row.row.email } });
  };
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{ allColumns: true, fileName: "EmployeesList" }}
        />
      </GridToolbarContainer>
    );
  };

  const closeModal = () => {
    setDeletedModal(false);
  };
  return (
    <>
      {showDeletedModal && (
        <CustomModal
          content="Employee Deleted Successfully"
          showModal={showDeletedModal}
          size="sm"
          closeModal={closeModal}
          title="Deletion"
        />
      )}
      <div className={`${classes.pageHeader} ${classes.mb2}`}>
        <Typography variant="h5">Employees List</Typography>
        {user ? (
          <Button variant="contained" color="primary" onClick={addNewEmployee}>
            Add Employee
          </Button>
        ) : null}
      </div>
      <Box sx={{ height: 600, width: "100%" }}>
        {employeeList.length > 0 ? (
          <DataGrid
            columns={columns}
            rows={employeeList}
            getRowId={(row) => row.id}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 50]}
            pagination
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        ) : null}
      </Box>
    </>
  );
};

export default EmployeeList;
