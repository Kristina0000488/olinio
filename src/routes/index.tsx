import React from "react";
import {
    Routes,
    Route,
    Navigate,
}  from "react-router-dom";

import Index from '../pages';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';
import DashboardPage from '../pages/dashboardPage';


export const Router: React.FC = () => 
{          
    return (
        <React.Suspense fallback={ <p>please, wait</p> }>
            <Routes>                
                <Route index element={ <Index /> } />
                <Route path={ '/login' } element={ <LoginPage /> } />
                <Route path={ '/register' } element={ <RegisterPage /> } />
                <Route path={ '/dashboard' } element={ <DashboardPage /> } />
                <Route path={ '*' } element={ <Navigate to="/" replace /> } />
            </Routes>
        </React.Suspense>
    )    
}