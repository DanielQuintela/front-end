import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/LoginPage";
import CadastroUser from "../pages/CadastroUser";


const Rota = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro/usuario" element={<CadastroUser />} />
      </Routes>
    </Router>
  );
}

export default Rota;