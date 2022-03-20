import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/ui-components/Button";
import { FormField } from "../../shared/components/ui-components/FormField";
import Storage from "../../shared/utils/Storage";
import { useAuthContext } from "../auth/AuthContext"
import AuthService from '../auth/AuthService'

const credentialsCachedSessionName = 'credentialsCached';
export const LoginPage = () => {
    const cachedCredentials = Storage.get(credentialsCachedSessionName);
    const { cachedEmail, cachedPassword, rememberCredentialsValue } = cachedCredentials || {} ;
    const { handleLogin: onLogin } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [userCredentials, setUserCredentials] = useState({
        email: cachedEmail ||'',
        password: cachedPassword || '',
        rememberCredentials: rememberCredentialsValue || false
    });
    const [error, setError] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    const { email, password, rememberCredentials } = userCredentials;

    const handleInputChange = (event) => {
        const evtTarget = event?.target;
        setUserCredentials(credentials => ({
            ...credentials,
            [evtTarget.name]: evtTarget.type === 'checkbox' ?
            evtTarget.checked : evtTarget.value
        }))
    };

    const handleRememberCredentialsCheckbox=() => {
        if (rememberCredentials ) {
            !cachedCredentials && 
            Storage.set(credentialsCachedSessionName, 
                {   cachedEmail: email, 
                    cachedPassword: password, 
                    rememberCredentialsValue: true 
                });
        } else if(!rememberCredentials) {
            Storage.remove(credentialsCachedSessionName);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let hasError = false;
        let redirectTo;
        setisLoading(true);
        try{
            await AuthService.login(userCredentials);
            onLogin();
            handleRememberCredentialsCheckbox();
            redirectTo = location.state?.redirectTo?.pathname || '/';
        }catch(err){
            hasError = true;
        }finally{
            setisLoading(false);
            if(hasError){
                setError(hasError);
            }else{
                redirectTo && navigate(redirectTo, { replace: true }); 
            }  
        }

    }

    const isButtonDisabled = !email || !password || isLoading;

    return (
        <div className="loginPage">
          <h1 className="loginPage-title">Log in to Nodepop</h1>
          <form className="loginForm" onSubmit={handleFormSubmit}>
            <FormField
              type="text"
              name="email"
              label="User Email"
              className="loginForm-field"
              value={email}
              onChange={handleInputChange}
              // ref={ref}
            />
            <FormField
              type="password"
              name="password"
              label="Password"
              className="loginForm-field"
              value={password}
              onChange={handleInputChange}
            />

            <input
              type="checkbox"
              name="rememberCredentials"
              checked={rememberCredentials}
              value="rememberCredentials"
              onChange={handleInputChange}
            />
            <label htmlFor="rememberCredentials">Remember My Credentials</label>
           
            <Button
              className="loginForm-submit"
              type="submit"
              variant="primary"
              disabled={isButtonDisabled}
            >
              Log in
            </Button>
          </form>

          {isLoading && (
            <div>
              ...Loading - TODO: Spinner should be shown here
            </div>
          )}

          {error && (
            <div onClick={setError(null)} className="loginPage-error">
              {error.message} - TODO: An error notification should be shown here
            </div>
          )}

        </div>
      );

}