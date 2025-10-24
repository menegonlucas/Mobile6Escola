import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Professor from './pages/Professor'
import CadastroTurma from './pages/cadastro-turma'
import TurmaAtividades from './pages/turma-atividades'
import CadastroAtividade from './pages/cadastro-atividade'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setIsLoggedIn(!!token)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/professor" />} />
          <Route path="/professor" element={isLoggedIn ? <Professor /> : <Navigate to="/login" />} />
          <Route path="/cadastro-turma" element={isLoggedIn ? <CadastroTurma /> : <Navigate to="/login" />} />
          <Route path="/turma-atividades/:turmaId" element={isLoggedIn ? <TurmaAtividades /> : <Navigate to="/login" />} />
          <Route path="/cadastro-atividade/:turmaId" element={isLoggedIn ? <CadastroAtividade /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/professor" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}