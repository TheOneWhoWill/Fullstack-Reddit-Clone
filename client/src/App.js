import './firebase'
import 'firebase/auth'
import React from'react'
import './styles/main.scss'
import Body from './components/Body'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Elements/Header'
import { AuthProvider } from './contexts/AuthContext'
import { PromptProvider } from './contexts/PromptContext'

function App() {
  return (
    <PromptProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Body />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </PromptProvider>
  );
}

export default App;