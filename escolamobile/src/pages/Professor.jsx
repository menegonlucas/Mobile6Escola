import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Professor() {
  const navigate = useNavigate()
  const [professor, setProfessor] = useState(null)
  const [turmas, setTurmas] = useState([])

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) setProfessor(JSON.parse(userData))
    
    // Dados mock
    setTurmas([
      { id: 1, nome: 'Desenvolvimento de Sistemas 1DES' },
      { id: 2, nome: 'Desenvolvimento de Sistemas 2DES' },
      { id: 3, nome: 'Desenvolvimento de Sistemas 3DES' },
    ])
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    navigate('/login')
  }

  const excluirTurma = (turma) => {
    if (confirm(`Excluir turma "${turma.nome}"?`)) {
      setTurmas(turmas.filter(t => t.id !== turma.id))
    }
  }

  return (
    <div className="professor-container">
      <header className="header">
        <h2>{professor?.nome || 'Professor'}</h2>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </header>

      <main className="main-content">
        <button 
          onClick={() => navigate('/cadastro-turma')}
          className="btn-primary"
        >
          Cadastrar Turma
        </button>

        <h3>Turmas</h3>
        
        <div className="turmas-list">
          {turmas.map((turma, index) => (
            <div key={turma.id} className="turma-card">
              <div className="turma-info">
                <span className="turma-numero">{index + 1}</span>
                <span className="turma-nome">{turma.nome}</span>
              </div>
              <div className="turma-actions">
                <button 
                  onClick={() => excluirTurma(turma)}
                  className="btn-danger"
                >
                  Excluir
                </button>
                <button 
                  onClick={() => navigate(`/turma-atividades/${turma.id}`)}
                  className="btn-secondary"
                >
                  Visualizar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}