import React, { useState, createContext, useContext } from 'react'

const AwardContext = createContext()

export function useAward() {
  return useContext(AwardContext)
}

export function AwardProvider(props) {
  const [AwardData, setAward] = useState()

  function setAwardData(postID) {
    setAward(postID)
  }

  const value = {
    setAwardData,
    AwardData
  }

  return (
    <AwardContext.Provider value={value}>
      {props.children}
    </AwardContext.Provider>
  )
}