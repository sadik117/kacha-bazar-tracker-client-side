import React, { useContext } from 'react';
import { Navigate, useLocation} from "react-router";
import { AuthContext } from '../Authentication/AuthProvider';
import Loading from '../pages/Loading';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();  

    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
         return children;
    }

    return <Navigate to="/auth/login" state={{ from: location }} replace />;
   
};

export default PrivateRoute;