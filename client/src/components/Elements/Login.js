import React, { useRef, useState } from'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { faLock, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to sign in')
    }

    setLoading(false)
  }
  return (
    <div class="Form">
      {error ? <div className="prompt">{error}</div> : <></>}
      <form onSubmit={handleSubmit} class="inputForm inputLogin">
        <h2>Log In</h2>
        <div className="formInput">
          <FontAwesomeIcon icon={faUser} />
          <input ref={emailRef} name="user" type="email" placeholder="Email"/>
        </div>
        <div className="formInput">
          <FontAwesomeIcon icon={faLock} />
          <input ref={passwordRef} name="password" type="password" placeholder="Password"/>
        </div>
        <Link to="/register" className="redirectFromButton">Register <FontAwesomeIcon icon={faChevronRight} /></Link>
        <h4>By continuing, you agree to our User Agreement and Privacy Policy.</h4>
        <button className="formButton" disabled={loading}>Login</button>
      </form>
    </div>
  );
}

export default Login;