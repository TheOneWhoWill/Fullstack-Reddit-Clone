import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, displayName, profile) {
    return auth.createUserWithEmailAndPassword(email, password).then(function(result) {
      result.user.updateProfile({
        displayName: displayName,
        photoURL: profile
      })
    })
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentuser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    resetPassword,
    currentUser,
    updateEmail,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}