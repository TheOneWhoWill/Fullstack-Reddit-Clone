import './firebase'
import 'firebase/auth'
import React from'react'
import './styles/main.scss'
import Body from './components/Body'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Elements/Header'
import { AuthProvider } from './contexts/AuthContext'
import { AwardProvider } from './contexts/AwardContext'
import { PromptProvider } from './contexts/PromptContext'

function App() {
  return (
    <AwardProvider>
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
    </AwardProvider>
  );
}

export default App;