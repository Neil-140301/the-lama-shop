import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/api';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      login(dispatch, { username, password });
    },
    [username, password, dispatch]
  );

  if (currentUser) {
    history.replace('/');
    return null;
  }

  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center',
      }}
      className="flex justify-center items-center flex-col h-screen "
    >
      <h1 className="text-4xl mb-16 tracking-wider underline ">The Lama Shop</h1>
      <div
        style={{ minHeight: '250px', width: '300px' }}
        className="bg-white p-5 border rounded-lg shadow flex flex-col items-center justify-center relative "
      >
        <img
          src="https://avatars.githubusercontent.com/u/1486366?v=4"
          alt=""
          className="topAvatar ring ring-gray-500 absolute "
          style={{ top: '-20px' }}
        />
        <input
          style={{ padding: '10px', margin: '20px 0px' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="border-b outline-none "
        />
        <input
          style={{ padding: '10px', marginBottom: '20px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="border-b outline-none "
        />
        <button
          disabled={isFetching}
          style={{ padding: '10px', width: '100px', backgroundColor: 'teal' }}
          onClick={handleLogin}
          className="rounded p-4 text-white my-4 "
        >
          Login
        </button>
        {error && (
          <span className="text-red-500 ">Something Went Wrong...</span>
        )}
      </div>
    </div>
  );
};

export default Login;
