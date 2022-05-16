import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import Storage from './shared/utils/Storage';
import { BrowserRouter as Router } from 'react-router-dom';
import ApiClient from './components/api-client/Client';
import 'bootstrap/dist/css/bootstrap.min.css';
import storeSetup from './store-redux';

const accessToken = Storage.get('auth');
ApiClient.setAuthorizationHeader(accessToken);
const history = createBrowserHistory();
const store = storeSetup({authentication: !!accessToken},{history} );
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App isInitiallyLogged={!!accessToken} />
      </Router>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
