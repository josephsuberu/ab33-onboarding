import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Verify from "./pages/verify/Verify";
import PageView from "./components/ui/dashboard/PageView";

function App() {
  return (
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/sidebar" element={<PageView />} />
      </Routes>
  );
}

export default App;
