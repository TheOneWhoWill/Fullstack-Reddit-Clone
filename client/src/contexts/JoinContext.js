import axios from 'axios';
import React, { useState, createContext, useContext } from 'react'

const JoinContext = createContext()

export function JoinedCummunities() {
  return useContext(JoinContext)
}

export function JoinedProvider(props) {
  const [joined, setJoined] = useState()

  function joinCummunity(user, cummunity) {
    //setJoined(user)
  }

  function leaveCummunity(user, cummunity) {
    //setJoined(user)
  }

  const value = {
    joinCummunity,
    joined
  }

  return (
    <JoinContext.Provider value={value}>
      {props.children}
    </JoinContext.Provider>
  )
}