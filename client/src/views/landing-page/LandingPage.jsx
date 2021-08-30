import {Link} from 'react-router-dom';
import React from "react";

export default function LandingPage() {
    return (
        <div>
            <Link to="/home">
                <button>Home</button>
            </Link>
        </div>
    );
};


