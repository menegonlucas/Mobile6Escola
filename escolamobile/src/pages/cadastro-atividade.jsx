import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CadastroAtividade() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [descricao, setDescricao] = useState('')
  const [turma, setTurma] = useState(null)

  useEffect(() => {
    // Dados mock
    const turmas = [
      { id: 1, nome: 'Desenvolvimento de Sistemas 1DES' },
      { id: 2, nome: 'Desenvolvimento de Sistemas 2DES' },
      { id: 3, nome: 'Desenvolvimento de Sistemas 3DES' },
    ]
    
    const turmaEncontrada = turmas.find(t => t.id === parseInt(turmaId))
    setTurma(turmaEncontrada)
  }, [turmaId])

  const handleSalvar = (e) => {
    e.preventDefault()
    
    if (descricao.trim()) {
      alert(`Atividade "${descricao}" cadastrada com sucesso!`)
      navigate(`/turma-atividades/${turmaId}`)
    } else {
      alert('Por favor, informe a descrição da atividade')
    }
  }

  return (
    <div className="page-container">
      <header className="header">
        <h2>Nova Atividade</h2>
        <button onClick={() => navigate(`/turma-atividades/${turmaId}`)} className="back-btn">Voltar</button>
      </header>

      <main className="main-content">
        <p className="turma-info">Turma: {turma?.nome || 'Carregando...'}</p>
        <p className="subtitle">Informe a descrição da atividade e confirme para cadastrar.</p>

        <form onSubmit={handleSalvar}>
          <label className="form-label">Descrição da atividade</label>
          <textarea
            placeholder="Digite a descrição da atividade"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="form-textarea"
            rows="4"
          />

          <button type="submit" className="btn-primary">Salvar</button>
        </form>
      </main>
    </div>
  )
}