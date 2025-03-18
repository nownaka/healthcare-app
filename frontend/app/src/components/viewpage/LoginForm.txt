import React from 'react';

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  errorMessage?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  errorMessage,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={onEmailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={onPasswordChange} />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={onSubmit}>Login</button>
    </div>
  );
};

export default LoginForm;