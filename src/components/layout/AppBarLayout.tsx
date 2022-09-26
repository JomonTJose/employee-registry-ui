import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import EmployeeList from "../EmployeeList/EmployeeList";
import Login from "../Login";
import useAuth from "../../hooks/useAuth";
import Register from "../Register";
import Employee from "../EmployeeList/Employee";

const AppLayout = () => {
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const { user } = auth;
  let navigate = useNavigate();

  const loadLoginComponent = () => {
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                }}
              >
                Employee Registry
              </Typography>
            </Link>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              {user ? (
                <>
                  <Tooltip title={user.firstName + " " + user.lastName}>
                    <IconButton>
                      <Avatar>
                        {" "}
                        {user.firstName.charAt(0).toUpperCase()}{" "}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Button
                    sx={{ my: 1, color: "white", display: "" }}
                    onClick={() => {
                      setAuth({});
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={loadLoginComponent}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="*" element={<Navigate to={"/employees"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employees/employee" element={<Employee />} />
      </Routes>
    </>
  );
};

export default AppLayout;
