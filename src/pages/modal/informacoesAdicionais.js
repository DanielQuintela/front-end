import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import "./informacoesAdicionais.css";
import axios from "../../api/axios";

export default function Modal  ({ isOpen, onClose, onCloseOut, editor, onSave, formData, setFormData})  {

    const [cepBusca, setCepBusca] = useState("");

    const sendData = async (event) => {
        try {
            event.preventDefault();
            const data = {
                email: formData.email,
                dataNascimento: formData.dataNascimento,
                cep: formData.cep,
                estado: formData.estado,
                cidade: formData.cidade,
                endereco: formData.endereco,
                telefone: formData.telefone,
                numero: formData.numero,
                complemento: formData.complemento,
            }
            console.log(data)
            const response = await axios.post('/usuarios/information',
            
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json"},
                    // withCredentials: true,
            });
            
            console.log(response.data)
            onClose()
        } catch (err) {
            alert("Erro ao cadastrar"+err)
        }
    }

    const handleBuscarCep = useCallback( async (event) => {
        
        try {
            const cepFormatado = cepBusca.replace(/[-. ]/g, '');
            if (/^\d{0,8}$/.test(cepFormatado)) {
                // Se o valor contém apenas números e tem no máximo 8 dígitos
                
                if (cepFormatado.length > 7 && cepFormatado.length < 9) {
                    const data = {
                        cep: cepFormatado,
                    }
            
                    const response = await axios.post('services/getcep',
                    
                    JSON.stringify(data),
                    {
                        headers: {
                            "Content-Type": "application/json"},
                    });
        
                    console.log(response.data)
                    setFormData({
                        cep: response.data.cep,
                        estado: response.data.uf,
                        cidade: response.data.localidade,
                        endereco: response.data.logradouro,
                        complemento: response.data.bairro,
                    });
                }
            }
        } catch (err) {
            alert("Erro ao buscar CEP"+err)
        }
    }, [cepBusca, setFormData]);

    useEffect(() => {
        // Esta função será chamada sempre que cepBusca mudar
        if (cepBusca.length > 7) {
          handleBuscarCep();
        }
      }, [cepBusca, handleBuscarCep]);

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
            <input 
                className="input-text" 
                type="text" 
                placeholder="Número de Telefone" 
                value={formData.telefone}
                onChange={(e) => {
                    editor(e,"telefone")
                }}
            />
            
            <input
                className="input-text"
                type="date"
                placeholder="Data de Nascimento"
                value={formData.dataNascimento}
                onChange={(e) => {
                    editor(e, "dataNascimento");
                }}
            />
            <input className="input-text" type="text" placeholder="CEP" onChange={(e) => {setCepBusca(e.target.value)}}  />
            <input className="input-text" 
                type="text" 
                placeholder="Estado" 
                value={formData.estado} 
                onChange={(e) => {editor(e,"estado")}}
                disabled = {formData.cep === "" ? true : false}
                required
                />
            <input className="input-text" 
                type="text" 
                placeholder="Cidade"  
                value={formData.cidade}
                onChange={(e) => {editor(e,"cidade")}}
                disabled = {formData.cep === "" ? true : false}
                required
                />
            <input className="input-text" 
                type="text" 
                placeholder="Endereço" 
                value={formData.endereco}
                onChange={(e) => {editor(e,"endereco")}}
                disabled = {formData.cep === "" ? true : false}
                required
                />
            <input className="input-text"
                type="text"
                placeholder="Complemento"
                value={formData.complemento}
                onChange={(e) => {editor(e,"complemento")}}
                disabled = {formData.cep === "" ? true : false}
                required
            />  
            <input className="input-text" 
                type="text"
                placeholder="Número"
                value={formData.numero}
                onChange={(e) => {editor(e,"numero")}}
                required
            />
           
            <button 
                className={formData.cep === "" ? "input-button" : "finish-button"}
                onClick={formData.cep === "" ? onClose : sendData}>
                {formData.cep === "" ? "Concluir Depois" : "Concluir Cadastro"}
            </button>
        </div>
    </div>
</div>  );
};

// export default Modal;
