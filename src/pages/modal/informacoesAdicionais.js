import React from "react";
import { useState } from "react";
import "./informacoesAdicionais.css";
import axios from "../../api/axios";

export default function Modal  ({ isOpen, onClose, onCloseOut, editor, onSave, formData, setFormData })  {

    const [cepBusca, setCepBusca] = useState("");

    const handleBuscarCep = async (event) => {
        // setCepBusca(event.target.value)
        try {
            const data = {
                cep: cepBusca,
            }
            event.preventDefault();
            console.log(cepBusca)
            const response = await axios.post('services/getcep',
            
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json"},
                    // withCredentials: true,
            });

            console.log(response.data)
            setFormData({
                ...formData,
                cep: response.data.cep,
                estado: response.data.uf,
                cidade: response.data.localidade,
                endereco: response.data.logradouro,
            })
            console.log(data)
        } catch (err) {
            alert("Erro ao buscar CEP"+err)
        }
    }

  return (
    <div
    id="meuModal"
    className="modal"
    style={{ display: isOpen ? "block" : "none" }}
    >
    <div className="modal-overlay" onClick={onCloseOut} style={{ display: isOpen ? "block" : "none" }}>
        <div className="modal-content">
            <div className="modal-header">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h3 className="modal-title">Informações Adicionais</h3>
            </div>
            
            {/* Adicione aqui os campos adicionais do formulário */}
            <input className="input-text" type="text" placeholder="Número de Telefone" />
            <input
                className="input-text"
                type="date"
                placeholder="Data de Nascimento"
                value={formData.dataNascimento}
                onChange={(e) => {
                    editor(e, "dataNascimento");
                }}
            />
            <input className="input-text" type="text" placeholder="CEP" onChange={(e) => {setCepBusca(e.target.value)}} onBlur={handleBuscarCep}   />
            <input className="input-text" 
                type="text" 
                placeholder="Estado" 
                value={formData.estado} 
                onChange={(e) => {editor(e,"estado")}}
                disabled = {formData.cep === "" ? true : false}

                />
            <input className="input-text" 
                type="text" 
                placeholder="Cidade"  
                value={formData.cidade}
                onChange={(e) => {editor(e,"cidade")}}
                disabled = {formData.cep === "" ? true : false}
                />
            <input className="input-text" 
                type="text" 
                placeholder="Endereço" 
                value={formData.endereco}
                onChange={(e) => {editor(e,"endereco")}}
                disabled = {formData.cep === "" ? true : false}
                />
            <button 
                className={formData.cep === "" ? "input-button" : "finish-button"}
                onClick={onClose}>
                {formData.cep === "" ? "Concluir Depois" : "Concluir Cadastro"}
            </button>
        </div>
    </div>
</div>  );
};

// export default Modal;
