import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { lazy } from "react";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/admin/Login"));
const Register = lazy(() => import("./components/admin/Register"));
const ChangePassword = lazy(() => import("./components/admin/ChangePassword"));
const PasswordList = lazy(() => import("./components/password/PasswordList"));
const PasswordForm = lazy(() => import("./components/password/PasswordForm"));
const PasswordDetail = lazy(
  () => import("./components/password/PasswordDetail")
);
const DateList = lazy(() => import("./components/Dates/DateList"));
const DateForm = lazy(() => import("./components/Dates/CreateDateForm"));
const CreateKhataEntryForm = lazy(
  () => import("./components/KhataEntry/CreateKhataEntryForm")
);
const KhataList = lazy(() => import("./components/KhataEntry/KhataList"));
const CreateTaskEntryForm = lazy(
  () => import("./components/Tasks/CreateTaskEntryForm")
);
const TaskList = lazy(() => import("./components/Tasks/TaskList"));
const CreateTransactionEntryForm = lazy(
  () => import("./components/Transactions/CreateTransactionEntryForm")
);
const TransactionList = lazy(
  () => import("./components/Transactions/TransactionsList")
);
const CreateWatchlist = lazy(
  () => import("./components/Watchlist/CreateWatchlist")
);
const WatchlistItems = lazy(
  () => import("./components/Watchlist/WatchlistItems")
);
const RentList = lazy(() => import("./components/RentAndTenant/RentList"));
const CreateRent = lazy(() => import("./components/RentAndTenant/CreateRent"));
const GetPendingRents = lazy(
  () => import("./components/RentAndTenant/PendingRents")
);
const TenantList = lazy(() => import("./components/RentAndTenant/TenantList"));
const CreateTenant = lazy(
  () => import("./components/RentAndTenant/CreateTenant")
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const App = () => {
  //if you want only login with azure enabled, then keep below block,
  //const { accounts } = useMsal();
  // const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  //   if (!accounts.length) {
  //     return <Navigate to="/login" />;
  //   }
  //   return <>{children}</>;
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="changepassword" element={<ChangePassword />} />

          <Route path="passwordlist" element={<PasswordList />} />
          <Route path="passwordlist/create" element={<PasswordForm />} />
          <Route path="passwordlist/edit/:id" element={<PasswordForm />} />
          <Route path="passwordlist/:id" element={<PasswordDetail />} />

          <Route path="datelist" element={<DateList />} />
          <Route path="dates/create" element={<DateForm />} />
          <Route path="dates/edit/:id" element={<DateForm />} />

          <Route path="khatalist" element={<KhataList />} />
          <Route path="khata/create" element={<CreateKhataEntryForm />} />
          <Route path="khata/edit/:id" element={<CreateKhataEntryForm />} />

          <Route path="tasklist" element={<TaskList />} />
          <Route path="task/create" element={<CreateTaskEntryForm />} />
          <Route path="task/edit/:id" element={<CreateTaskEntryForm />} />

          <Route path="transactionlist" element={<TransactionList />} />
          <Route
            path="transaction/create"
            element={<CreateTransactionEntryForm />}
          />
          <Route
            path="transaction/edit/:id"
            element={<CreateTransactionEntryForm />}
          />

          <Route path="watchlistitems" element={<WatchlistItems />} />
          <Route path="watchlistitems/create" element={<CreateWatchlist />} />
          <Route path="watchlistitems/edit/:id" element={<CreateWatchlist />} />

          <Route path="rentlist" element={<RentList />} />
          <Route path="rent/create" element={<CreateRent />} />
          <Route path="rent/edit/:id" element={<CreateRent />} />
          <Route path="getpendingrents" element={<GetPendingRents />} />

          <Route path="tenantlist" element={<TenantList />} />
          <Route path="tenant/create" element={<CreateTenant />} />
          <Route path="tenant/edit/:id" element={<CreateTenant />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
