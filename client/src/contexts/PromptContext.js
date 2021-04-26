import React, { useState, createContext, useContext } from 'react'

const PromptContext = createContext()

export function usePrompt() {
  return useContext(PromptContext)
}

export function PromptProvider(props) {
  const [prompt, setPrompt] = useState()

  function setPromptData(msg) {
    setPrompt(msg)
    setTimeout(() => {
      setPrompt(null)
    }, 1500)
  }

  const value = {
    setPromptData,
    prompt
  }

  return (
    <PromptContext.Provider value={value}>
      {props.children}
    </PromptContext.Provider>
  )
}