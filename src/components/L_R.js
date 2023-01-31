import { useState } from "react"

const L_R = ({onRegister}) => {
    const [login, setLogin] = useState('')
    const [pwd, setPwd] = useState('')
  
    const onSubmit = (e) => {
      e.preventDefault()
  
      if (!login) {
        alert('Please add a login')
        return
      }
      
      if (!pwd) {
        alert('Password cannot be empty')
        return
      }

      onRegister({ login, pwd})
  
      setLogin('')
      setPwd('')
    }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Login</label>
        <input
          type='text'
          placeholder='Add Login'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Password</label>
        <input
          type='text'
          placeholder='Add Pwd'
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>
      <input type='submit' value='Register/Login' className='btn btn-block' />
    </form>
  )
}

export default L_R