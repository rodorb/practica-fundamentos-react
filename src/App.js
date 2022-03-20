import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdvertPage } from './components/adverts/advert-page/AdvertPage';
import { AdvertsPage } from './components/adverts/adverts-page/AdvertsPage';
import { NewAdvertPage } from './components/adverts/new-advert-page/NewAdvertPage';
import { AuthContextProvider } from './components/auth/AuthContext';
import { LoginPage } from './components/login-page/LoginPage';
import { RequireAuth } from './components/auth/RequireAuth';
import { Layout } from './components/layout/Layout';
import { NotFoundPage } from './shared/components/NotFoundPage';

function App({isInitiallyLogged}) {
  const [isLoggedUser, setLoggedUser] = useState(isInitiallyLogged);
  const handleLogin = () =>{
    setLoggedUser(true);
  };

  const handleLogout = () =>{
    setLoggedUser(false);
  }

  return (
    <div className="App">
      <AuthContextProvider value={{isLoggedUser, handleLogin, handleLogout}}>
        <Routes>
          <Route path='/login' element={ <LoginPage/>} />
          <Route path='/adverts' element={
            <RequireAuth>
                <Layout/>
            </RequireAuth>
          }>
              <Route index element={<AdvertsPage/>}/>
              <Route path=':advertId' element={<AdvertPage/>}/>
              <Route path='/adverts/new' element={<NewAdvertPage/>}/>
          </Route>
          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route path='/404' element={<NotFoundPage/>}/>
          <Route path='*' element={<Navigate to="/404"/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
