// --- STYLE IMPORTS ---
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

// --- PACKAGE IMPORTS ---
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import store from './store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async'

// --- SCREEN IMPORTS
import HomeScreen from './screens/HomeScreen';
import ReportListScreen from './screens/admin/ReportListScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import AppLayout from './screens/AppLayout';
import ProtectedRoute from './screens/ProtectedRoute';

// --- COMPONENT IMPORTS
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import CityList from './components/CityList';
import City from './components/City';
import CountryList from './components/CountryList';
import Form from './components/Form';

import { CitiesProvider } from "./contexts/CitiesContext";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={ true } path='/' element={ <HomeScreen /> }/>
      <Route path='/login' element={ <LoginScreen /> }/>
      <Route path='/register' element={ <RegisterScreen /> }/>

      <Route path='' element={ <PrivateRoute /> }>
        <Route path='/profile' element={ <ProfileScreen /> }></Route>
        <Route path='/app' element={ <App /> }></Route>
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route index element={<Navigate replace to="cities" />} />
        <Route path="cities" element={<CityList />} />
        <Route path="cities/:id" element={<City />} />
        <Route path="countries" element={<CountryList />} />
        <Route path="form" element={<Form />} />
      </Route>

      <Route path='' element={ <AdminRoute /> }>
        <Route path='/admin/reports' element={ <ReportListScreen /> }/>
        <Route path='/admin/users' element={ <UserListScreen /> }/>
        <Route path='/admin/user/edit/:id' element={ <UserEditScreen /> }/>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
          {/* Wrap the entire router setup with CitiesProvider */}
          <CitiesProvider>
            <RouterProvider router={router} />
          </CitiesProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
