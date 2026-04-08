import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Verify from "./pages/verify/Verify";

function App() {
  return (
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
  );
}

export default App;
