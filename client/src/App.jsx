import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          {" "}
          <Route path="/home" element={<Home />} />{" "}
        </Route>{" "}
        {/* Default */} <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
