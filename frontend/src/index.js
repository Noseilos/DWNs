// --- STYLE IMPORTS ---
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";

// --- PACKAGE IMPORTS ---
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

// --- SCREEN IMPORTS
import HomeScreen from "./screens/HomeScreen";
import ReportListScreen from "./screens/admin/ReportListScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import ChartLayout from "./screens/admin/ChartLayout";
import AppLayout from "./screens/AppLayout";
import ReportDetailScreen from "./screens/ReportDetailScreen";
import AboutScreen from "./screens/AboutScreen";
import NewsScreen from "./screens/NewsScreen";
import MyReportsScreen from "./screens/MyReportsScreen";

// --- COMPONENT IMPORTS
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Form from "./components/Form";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/report/:id" element={<ReportDetailScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/news" element={<NewsScreen />} />
      <Route path="/myreports" element={<MyReportsScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />}></Route>
        <Route path="/app" element={<AppLayout />} />
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route path="form" element={<Form />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/reports" element={<ReportListScreen />} />
        <Route path="/admin/report/:id" element={<ReportDetailScreen />} />
        <Route path="/admin/users" element={<UserListScreen />} />
        <Route path="/admin/user/edit/:id" element={<UserEditScreen />} />
        <Route path="/admin/charts" element={<ChartLayout />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
