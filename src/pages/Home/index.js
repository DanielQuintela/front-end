import React, { useState } from "react";
import "./Home.css";
import logo from "../../assets/logo/logo com fundo.png";
import CadastroUser from "../CadastroUser";
import Login from "../LoginPage";
import Modal from "../modal/informacoesAdicionais";
// import { useNavigate } from "react-router-dom";
// import "./menu.css";


function App() {
  // const navigate = useNavigate();
  const cidades = ['Aracaju', 'Maceió', 'Outra Cidade'];

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    const loginModal = document.getElementById("login")
    // Modal.style.display = "block";
    setModalVisible(true);
  }
  const handleFecharModalFora = (e) => {
    if (e.target.classList.contains("login-content")) {
        setModalVisible(false);
    }
    };
   
  const handleFecharModal = () => {
    setModalVisible(false);
  }
  
  return (
  <body>
   <header>
      <div className="menu-suspenso">
        <div className="menu-suspenso-logo">
          <img src={logo} alt="Logo home" />
        </div>
        <div className="opcoes-menu">
          <ul>
              <a href="/home">Home</a>
           
              <a href="/duvidas">Dúvidas</a>
           
              <a href="/artigos">Artigos</a>
           
              <a href="/sobre">Sobre</a>

              <a href="/cadastro/veterinario">É Veterinário?</a>

              <a className="login" onClick={handleLogin}>Login</a>
          </ul>
        </div>
      </div>
  </header>
  
  <div className="container-menu">
    <div className="conteudo-menu">
      <h3>Agende agora sua consulta</h3>
      <h4>Os melhores especialistas da sua região prontos para te ajudar</h4>
      <div className="container-menu-busca">
        <select className="select-city-home">
          <option>Selecione a cidade</option>
          {cidades.map((cidade, index) => (
            <option key={index} value={cidade.toLocaleLowerCase()}>
              {cidade}
            </option>
          ))}
        </select>
        <input
        className="input-text-home"
        type="text"
        placeholder="Encontrar parceiro"
        
        />
        <button>Pesquisar</button>
      </div>
    </div>
  </div>

  <Login 
    isOpen={modalVisible}
    onCloseOut={handleFecharModalFora}
    onClose={handleFecharModal}
    
  />
 
  </body>
  );
}

export default App;
