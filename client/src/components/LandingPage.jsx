import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <h2>
                Trust in your sauce food lover
            </h2>
            <Link to='/home'>
                <button>Got it</button>
            </Link>
        </div>
    )
}