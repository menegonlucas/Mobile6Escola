import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function TurmaAtividades() {
  const navigate = useNavigate()
  const { turmaId } = useParams()
  const [professor, setProfessor] = useState(null)
  const [turma, setTurma] = useState(null)
  const [atividades, setAtividades] = useState([])

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) setProfessor(JSON.parse(userData))

    // Dados mock
    const turmas = [
      { id: 1, nome: 'Desenvolvimento de Sistemas 1DES' },
      { id: 2, nome: 'Desenvolvimento de Sistemas 2DES' },
      { id: 3, nome: 'Desenvolvimento de Sistemas 3DES' },
    ]
    
    const turmaEncontrada = turmas.find(t => t.id === parseInt(turmaId))
    setTurma(turmaEncontrada)

    // Atividades mock
    setAtividades([
      { id: 1, descricao: 'Prova de Programação Web' },
      { id: 2, descricao: 'Trabalho de Banco de Dados' },
      { id: 3, descricao: 'Apresentação de Mobile' },
    ])
  }, [turmaId])

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    navigate('/login')
  }

  return (
    <div className="professor-container">
      <header className="header">
        <h2>{professor?.nome || 'Professor'}</h2>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </header>

      <main className="main-content">
        <h3 className="turma-title">{turma?.nome || 'Turma'}</h3>
        
        <button 
          onClick={() => navigate(`/cadastro-atividade/${turmaId}`)}
          className="btn-primary"
        >
          Cadastrar Atividade
        </button>

        <h4>Atividades</h4>
        
        <div className="atividades-list">
          {atividades.map((atividade, index) => (
            <div key={atividade.id} className="atividade-card">
              <span className="atividade-numero">{index + 1}</span>
              <span className="atividade-descricao">{atividade.descricao}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}