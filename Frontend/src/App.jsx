import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<Navigate to="/login" replace />} />
        <Route path="/products" element={<Navigate to="/products" replace />} />
        <Route path="/categories" element={<Navigate to="/categories" replace />} />
        <Route path="/brands" element={<Navigate to="/brands" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
