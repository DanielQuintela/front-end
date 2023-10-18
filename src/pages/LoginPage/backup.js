import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo/logo com fundo.png";

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
        alert("Logado com sucesso\n" + JSON.stringify(data, null, 2));
      } else {
        alert("Erro ao logar");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao logar2");
    }
  };

  return (
    <div className="login-container">
      <div className="side-bar"></div>
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
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
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}
