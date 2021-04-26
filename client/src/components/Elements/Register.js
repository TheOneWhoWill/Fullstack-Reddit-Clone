import React, { useRef, useState } from'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { faLock, faChevronRight, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Register() {
  const userRef = useState()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value, `u/${userRef.current.value}`, "https://avatars.githubusercontent.com/u/49823186?v=4")
      history.push('/')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }
  return (
    <div class="Form">
      <h3>{error ? <p>{error}</p> : <></>}</h3>
      <form onSubmit={handleSubmit} class="inputForm inputRegister">
        <h2>Register</h2>
        <div className="formInput">
          <FontAwesomeIcon icon={faUser} />
          <input ref={userRef} type="text" placeholder="Username"/>
        </div>
        <div className="formInput">
          <FontAwesomeIcon icon={faEnvelope} />
          <input ref={emailRef} type="email" placeholder="Email"/>
        </div>
        <div className="formInput">
          <FontAwesomeIcon icon={faLock} />
          <input ref={passwordRef} type="password" placeholder="Password"/>
        </div>
        <div className="formInput">
          <FontAwesomeIcon icon={faLock} />
          <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password"/>
        </div>
        <Link to="/login" className="redirectFromButton">Login <FontAwesomeIcon icon={faChevronRight} /></Link>
        <h4>By continuing, you agree to our User Agreement and Privacy Policy.</h4>
        <button className="formButton" disabled={loading}>Register</button>
      </form>
    </div>
  );
}

export default Register;