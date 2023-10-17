import React, { useState } from "react";
import "./Login.css";
import logo from "./logo com fundo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:4000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
      });
      
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        // alert("Logado com sucesso\n" + JSON.stringify(data, null, 2));
        navigate("/home");
      } else {
        alert("Erro ao logar");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      // alert("Erro ao logar2");
    }
  };

  return (
    <div className="login-container">
      
      <div className="side-bar">
        <div className="side-bar-content">
          <h1>Seja Bem Vindo !</h1>
          <h2>Caso não possua um cadastro no nosso site</h2>
        </div>
        <div className="campo-button">
        <p>
            Aperte abaixo para criar uma conta de usuário
          </p>
          <button className="input-button">Criar Conta Usuário </button>
          <p>
            Abaixo para criar uma conta de veterinário
          </p>
          <button className="input-button">Resgistrar Veterinário</button>
        </div>
        <div className="side-bar-footer">
          {/* <h3>BuscaVet</h3> */}
          <p>© 2023 BuscaVet. Todos os direitos reservados.</p>
        </div>
      </div>

      <div className="login-box">

        <div className="login-logo">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Faça seu login aqui</h2>
        </div>

        <div className="campo-input">
          <input
            className="input-text"
            type="text"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => {
              handleFormEdit(e, "email");
            }}
          />
          <input
            className="input-text"
            type="password"
            placeholder="Senha"
            required
            value={formData.senha}
            onChange={(e) => {
              handleFormEdit(e, "senha");
            }}
          />
          <button className="input-button" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </div>
  );
}
