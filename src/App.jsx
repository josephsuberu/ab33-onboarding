import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Verify from "./pages/verify/Verify";
import Layout from "./components/ui/dashboard/Layout";
import DashboardHome from "./pages/dashboard/DashboardHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />



      <Route path="/sidebar" element={<Layout />}>
        <Route path="/sidebar" element={<DashboardHome />} />
      </Route>
    </Routes>
  );
}

export default App;
