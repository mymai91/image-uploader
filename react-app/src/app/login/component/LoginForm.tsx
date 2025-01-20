"use client"

interface Props {}

const LoginForm: React.FC<Props> = () => {
  return (
    <div>
      <h1>Login Form</h1>
      <form>
        <label>Email</label>
        <input type="email" />

        <label>Password</label>
        <input type="password" />
      </form>
    </div>
  )
}

export default LoginForm
