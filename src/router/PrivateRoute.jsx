import React, { use } from 'react';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';
import { AuthContext } from '../Authentication/AuthProvider';
import Loading from '../pages/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    const location = useLocation();  

    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
         return children;
    }
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
   
};

export default PrivateRoute;