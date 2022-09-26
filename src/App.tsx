import React, { Suspense } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./components/layout/AppBarLayout";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Container maxWidth={false}>
        <Router>
          <AppLayout />
        </Router>
      </Container>
    </Suspense>
  );
};
export default App;
