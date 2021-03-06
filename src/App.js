import { Navigate, Route, Routes } from 'react-router-dom';
import { AdvertPage } from './components/adverts/advert-page/AdvertPage';
import { AdvertsPage } from './components/adverts/adverts-page/AdvertsPage';
import { NewAdvertPage } from './components/adverts/new-advert-page/NewAdvertPage';
import { LoginPage } from './components/login-page/LoginPage';
import { RequireAuth } from './components/auth/RequireAuth';
import { Layout } from './components/layout/Layout';
import { NotFoundPage } from './shared/components/NotFoundPage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/login' element={  <Layout/>} >
            <Route index element={<LoginPage/>}/>
          </Route>
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
          <Route path='/404' element={  <Layout/>}>
            <Route index element={<NotFoundPage/>}/>
          </Route>
          
          <Route path='*' element={<Navigate  to="/404"/>}/>
          <Route path='/adverts/*' element={<Navigate  to="/404"/>}/>
        </Routes>
    </div>
  );
}

export default App;
