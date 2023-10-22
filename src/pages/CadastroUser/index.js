import React, { useState, useEffect } from "react";
import "./cadastroUser.css";

export default function CadastroUser() {

    const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setShowConfirmPassword(!!newPassword); // Use !! para converter em um boolean
  };

    return (
        <div className="cadastro-usuario-container">
            <div className="side-user-content">
                <h1>Olá, seja bem vindo</h1>
                <p>Se você já tiver cadastro <br />
                Em nosso site, clique em "Login"</p>

            </div>

            <div className="form-user-content">
                <h1>Vamos a crição de Conta</h1>
                <p>Para se cadastrar, pode entrar com suas redes sociais ou preencha os campos abaixo:</p>

                <div className="form-user">
                    <input className="input-text" type="text" placeholder="Nome" />
                    <input className="input-text" type="text" placeholder="Email" />
                    <input className="input-text" type="text" placeholder="CPF" />
                    <input className="input-text" type="password" placeholder="Senha" />
                    <input
                        className={`confirm-password ${showConfirmPassword ? "confirm-password" : ""}`}
                        type="password"
                        placeholder="Confirmar Senha"
                        />
                    <button className="input-text" type="submit">Criar Conta</button>
                </div>

            </div>
        </div>
    )
}