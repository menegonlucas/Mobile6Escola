import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CadastroTurma() {
  const navigate = useNavigate()
  const [nomeTurma, setNomeTurma] = useState('')

  const handleSalvar = (e) => {
    e.preventDefault()
    
    if (nomeTurma.trim()) {
      alert(`Turma "${nomeTurma}" cadastrada com sucesso!`)
      navigate('/professor')
    } else {
      alert('Por favor, informe o nome da turma')
    }
  }

  return (
    <div className="page-container">
      <header className="header">
        <h2>Nova Turma</h2>
        <button onClick={() => navigate('/professor')} className="back-btn">Voltar</button>
      </header>

      <main className="main-content">
        <p className="subtitle">Informe o nome da turma e confirme para cadastrar.</p>

        <form onSubmit={handleSalvar}>
          <label className="form-label">Nome da turma</label>
          <input
            type="text"
            placeholder="Digite o nome da turma"
            value={nomeTurma}
            onChange={(e) => setNomeTurma(e.target.value)}
            className="form-input"
          />

          <button type="submit" className="btn-primary">Salvar</button>
        </form>
      </main>
    </div>
  )
}