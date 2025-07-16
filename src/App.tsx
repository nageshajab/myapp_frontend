import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ChangePassword from "./components/ChangePassword";
import PasswordList from "./components/PasswordList";
import PasswordForm from "./components/PasswordForm";
import PasswordDetail from "./components/PasswordDetail";
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
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
