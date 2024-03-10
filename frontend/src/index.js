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
import ReportDetailScreen from './screens/ReportDetailScreen'

// --- COMPONENT IMPORTS
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Form from './components/Form';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={ true } path='/' element={ <HomeScreen /> }/>
      <Route path='/login' element={ <LoginScreen /> }/>
      <Route path='/register' element={ <RegisterScreen /> }/>
        <Route path='/report/:id' element={ <ReportDetailScreen /> }/>

      <Route path='' element={ <PrivateRoute /> }>
        <Route path='/profile' element={ <ProfileScreen /> }></Route>
        <Route path='/app' element={ <AppLayout /> }/>
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route path="form" element={<Form />} />
      </Route>

      <Route path='' element={ <AdminRoute /> }>
        <Route path='/admin/reports' element={ <ReportListScreen /> }/>
        <Route path='/admin/report/:id' element={ <ReportDetailScreen /> }/>
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
            <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
