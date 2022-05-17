import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { getIsLogged } from "../../store-redux/selectors";

export const RequireAuth = ({ children }) => {
    const isLoggedUser = useSelector(getIsLogged);

    const location = useLocation();
    if (!isLoggedUser) {
        return <Navigate to = "/login"
        state = {
            { redirectTo: location } }
        replace = { true }
        />
    }
    return children;
}