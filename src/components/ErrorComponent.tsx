import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';

const ErrorComponent = () => {
    const {state} = useLocation();
    const {errorMessage}:any= state;
    const navigate = useNavigate();
    const goback = (e: any) => {
        navigate("/board");
    }

    return (
        <div data-testid="errorSection">
            {errorMessage ? errorMessage
                :
                <div>
                    <p>Oh, ho, Requested News Board Doesnt Exist</p>
                    <div>
                        <button onClick={(e) => goback(e)}>Go Back to Previos Page</button>
                    </div></div>
            }

           
        </div>

    )
}

export default ErrorComponent