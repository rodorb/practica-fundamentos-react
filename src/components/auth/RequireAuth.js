import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "./AuthContext"

export const RequireAuth = ({children})=>{
    const {isLoggedUser} = useAuthContext();
    const location = useLocation();
    if(!isLoggedUser){
        return <Navigate to="/login" state={{redirectTo: location}} replace={true}/>
    }
    return children;
}