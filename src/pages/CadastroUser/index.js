import React, { useState, useRef, useEffect } from "react";
import "./cadastroUser.css";
import Modal from "../modal/informacoesAdicionais.js"
import axios from "../../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function CadastroUser() {
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        dataNascimento: "",
        cep: "",
        estado: "",
        cidade: "",
        endereco: "",
        telefone: "",
      });
    

    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordsMatch, setPasswordsMatch] = useState(true); // Estado para verificar se as senhas coincidem
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        // setFormData(newPassword);
        handleFormEdit(e, "senha")
        setShowConfirmPassword(!!newPassword); // Use !! para converter em um boolean
    };

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
          [name]: event.target.value,
        });
      }

    useEffect(() => {
        // Verifique se as senhas coincidem sempre que uma delas for alterada
        if (formData.senha && confirmPassword) {
            setPasswordsMatch(formData.senha === confirmPassword);
          } else {
            setPasswordsMatch(true); // Se uma das senhas estiver vazia, considere-as como coincidentes
          }
        }, [formData.senha, confirmPassword]);

    const handleCadastro = async (event) => {
        try {
            event.preventDefault();
            
            console.log(formData)
            if(!passwordsMatch) {
                alert("As senhas não coincidem")
                return
            }
            const response = await axios.post("/usuarios",

            JSON.stringify(formData),
            {
                headers: {
                    "Content-Type": "application/json"},
                    // withCredentials: true,
            }
            );
            console.log(response)
            setModalVisible(true);

        } catch (err) {
            alert("Erro ao cadastrar"+err)
        }
    }

    const handleProximaEtapaClick = () => {
        const modal = document.getElementById("meuModal");
        modal.style.display = "block";
        setModalVisible(true);
    };
    const handleFecharModal = () => {
        const modal = document.getElementById("meuModal");
        modal.style.display = "none";
        setModalVisible(false);
      };
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleFecharModalFora = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
        setModalVisible(false);
    }
    };
    
   
    return (
        <div className="cadastro-usuario-container">
            <div className="side-user-content">
                <div className="side-header">
                    <button className="voltar"
                        onClick={() => navigate(-1)}
                    >
                    &larr;
                    
                    </button>
                    <h1>Olá, seja bem vindo</h1>
                </div>
                <p>Se você já tiver cadastro <br /> Em nosso site, clique em "Login"</p>
               
            </div>

            <div className="form-user-content">
                <h1>Vamos a criação de Conta</h1>
                <p>Para se cadastrar, pode entrar com suas redes sociais ou preencha os campos abaixo:</p>

                <div className="form-user">
                    <input className="input-text" type="text" placeholder="Nome" 
                    value={formData.nome} 
                    onChange={(e) => {
                        handleFormEdit(e, "nome");
                        }}
                    />
                    <input className="input-text" type="text" placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => {
                        handleFormEdit(e, "email");
                        }}
                     />
                    <input className="input-text" type="text" placeholder="CPF" 
                    value={formData.cpf}
                    onChange={(e) => {
                        handleFormEdit(e, "cpf");
                        }}
                    />
                    <input
                        ref={passwordRef}
                        className="input-text"
                        type="password"
                        placeholder="Senha"
                        onChange={handlePasswordChange} // Adicione o manipulador de mudanças
                    />
                    <input
                        ref={confirmPasswordRef}
                        className={!showConfirmPassword ? "offscreen_input-text" : "input-text"}
                        type="password"
                        placeholder="Confirmar Senha"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    {!passwordsMatch && (
                        <p className="error-message">As senhas não coincidem.</p>
                    )}
                    
                    <Modal
                        isOpen={modalVisible}
                        onClose={handleFecharModal }
                        onCloseOut={handleFecharModalFora}
                        formData={formData}
                        editor={handleFormEdit}
                        setFormData={setFormData}
                        onSave={() => {
                        // Lógica para salvar os dados do modal
                        }}
                        // Outros campos passados como propriedades para o modal
                    />

                    <button 
                        className="input-text" 
                        type="button" 
                        onClick={handleCadastro}>
                        Criar Conta
                    </button>
                    <button onClick={handleProximaEtapaClick}>
                        modal
                    </button>
                   
                </div>
            </div>
        </div>
    )
}
