import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/LoginPage";
import CadastroUser from "../pages/CadastroUser";
import CadastroVet from "../pages/CadastroVeterinario";


const Rota = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro/usuario" element={<CadastroUser />} />
        <Route path="/cadastro/veterinario" element={<CadastroVet />} />
      </Routes>
    </Router>
  );
}

export default Rota;