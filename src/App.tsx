import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";

import Login from "./components/admin/Login";
import Register from "./components/admin/Register";
import ChangePassword from "./components/admin/ChangePassword";

import PasswordList from "./components/password/PasswordList";
import PasswordForm from "./components/password/PasswordForm";
import PasswordDetail from "./components/password/PasswordDetail";

import DateList from "./components/Dates/DateList";
import DateForm from "./components/Dates/CreateDateForm";

import CreateKhataEntryForm from "./components/KhataEntry/CreateKhataEntryForm";
import KhataList from "./components/KhataEntry/KhataList";

import CreateTaskEntryForm from "./components/Tasks/CreateTaskEntryForm";
import TaskList from "./components/Tasks/TaskList";

import CreateTransactionEntryForm from "./components/Transactions/CreateTransactionEntryForm";
import TransactionList from "./components/Transactions/TransactionsList";

import CreateWatchlist from "./components/Watchlist/CreateWatchlist";
import WatchlistItems from "./components/Watchlist/WatchlistItems";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
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
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
