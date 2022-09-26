import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../index.css";

const ErrorComponent = () => {
  const { state } = useLocation();
  const { errorMessage }: any = state;
  const navigate = useNavigate();
  const goback = (e: any) => {
    navigate("/");
  };

  return (
    <div data-testid="errorSection" style={{ marginTop: "200px" }}>
      {errorMessage ? (
        errorMessage
      ) : (
        <div>
          <p>Oh, ho, Error Ocurred...</p>
        </div>
      )}
      <div>
        <button onClick={(e) => goback(e)}>Reload</button>
      </div>
    </div>
  );
};

export default ErrorComponent;
