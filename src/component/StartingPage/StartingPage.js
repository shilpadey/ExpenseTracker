import React from "react";
import { Link } from "react-router-dom";

const StartingPage = () => {
    console.log('inside starting page');
    return (
        <header>
            <div>
                Welcome to Expense Tracker!!!
            </div>
            <button>
                Your profile is incomplete
                <Link to='/profile'> Complete now </Link>
            </button>
        </header>
    );
};

export default StartingPage;