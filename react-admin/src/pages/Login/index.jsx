import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      login(dispatch, { username, password });
    },
    [username, password, dispatch]
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <input
        style={{ padding: '10px', marginBottom: '20px' }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
        className=""
      />
      <input
        style={{ padding: '10px', marginBottom: '20px' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="passoword"
        placeholder="password"
        className=""
      />
      <button style={{ padding: '10px', width: '100px' }} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
