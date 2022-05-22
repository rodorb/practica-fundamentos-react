import { useState } from "react";
import { FormField } from "../../shared/components/ui-components/FormField";
import { Page } from "../layout/Page";
import './LoginPage.css'
import ButtonBootstrap from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import { login } from "../../store-redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../store-redux/selectors";



export const LoginPage = () => {
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector(getUi);
   
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password:  '',
        rememberCredentials:  false
    });

    const { email, password, rememberCredentials } = userCredentials;

    const handleInputChange = ({ target: { value, name, type, checked } }) => {
        // const evtTarget = event?.target;
        setUserCredentials(credentials => ({
            ...credentials,
            [name]: type === 'checkbox' ?
            checked : value
        }))
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        dispatch(login(userCredentials));
        

    }

    const isButtonDisabled = !email || !password || isLoading;

    return (
      <Page>
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
            <label htmlFor="rememberCredentials">Recordar credenciales</label>
           


            <div className="formButton">
                <ButtonBootstrap size="lg" className="submit-form-button" variant="primary" type="submit" disabled={isButtonDisabled}>
                  Acceder                   
                </ButtonBootstrap>
              </div>
          </form>

          {isLoading && (
            <div>
             <Spinner animation="border" role="status" variant="warning" >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
          )}

          {error && (
            <Toast bg="danger">
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body>Se ha producido un error en la aplicación.</Toast.Body>
          </Toast>
          )}

        </div>
      </Page> 
        
      );

}