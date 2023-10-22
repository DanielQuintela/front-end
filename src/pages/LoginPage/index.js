import React, { useRef, useState, useContext, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/logo/logo com fundo.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider.js";

import axios from "../../api/axios.js";
const LOGIN_URL = "/usuarios/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext);

  const errRef = useRef();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errMsg, setErrMsg] = useState(""); // [1 - 1] - Criar estado para mensagem de erro

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    setErrMsg('');
}, [formData.email, formData.senha]);


  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json"},
          // withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));
      console.log(response)
      if (response.status === 200) {
        const acessToken = response?.data?.token;
        // const role = response?.data?.role;
        setAuth({ email: formData.email, senha: formData.senha, acessToken });
        setFormData({ email: "", senha: "" });
        alert("Logado com sucesso\n" + JSON.stringify(response?.data));
        // navigate("/home");
      } else {
        alert("Erro ao logar");
      }
    } catch (err) {
      if (!err?.response) {
          setErrMsg('Sem resposta do servidor');
      } else if (err.response?.status === 400) {
          setErrMsg('Email e senha são obrigatórios');
      } else if (err.response?.status === 404) {
          setErrMsg('Usuário não encontrado');
      } else if (err.response?.status === 401) {
          setErrMsg('Senha Incorreta');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
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
          <button className="input-button" onClick={() => navigate("/cadastro/usuario" )}>Criar Conta Usuário </button>
          <p>
            Abaixo para criar uma conta de veterinário
          </p>
          <button className="input-button" onClick={() => navigate("/cadastro/veterinario")}>Resgistrar Veterinário</button>
        </div>
        <div className="side-bar-footer">
          {/* <h3>BuscaVet</h3> */}
          <p>© 2023 BuscaVet. Todos os direitos reservados.</p>
        </div>
      </div>

      <div className="login-box">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

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
