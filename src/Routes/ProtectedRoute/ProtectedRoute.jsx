import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const isLoggedIn = useSelector(state => state.user.accessToken)

    const loc = useLocation()

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{origin: loc.pathname}}/>
    } else {
        return <Outlet/>
    }


    
};

export default ProtectedRoute;