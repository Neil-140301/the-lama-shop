import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/api';
import { useRouter } from 'next/router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const router = useRouter();

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      register(dispatch, { username, email, password });
      router.push('/login');
    },
    [username, password, email]
  );

  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center',
      }}
      className="h-screen w-screen flex items-center justify-center bg-cover "
    >
      <div className="p-[20px] w-3/4 sm:w-2/5 bg-white ">
        <h1 className="text-[24px] font-light ">CREATE AN ACCOUNT</h1>
        <form action="" className="flex flex-wrap ">
          <input
            type="text"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="name"
          />
          <input
            type="text"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="surname"
          />
          <input
            type="text"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="flex-1 min-w-2/5 mt-[20px] mr-[10px] p-[10px] outline-none
            border "
            placeholder="confirm password"
          />
          <span className="text-[12px] my-[20px] ">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button
            onClick={handleRegister}
            disabled={isFetching}
            className="w-2/5 py-[15px] px-[20px] bg-[teal] text-white cursor-pointer mb-3 "
          >
            CREATE
          </button>
        </form>
        <Link href="/login" className="">
          <a className="my-[10px] text-[12px] cursor-pointer ">
            ALREADY HAVE AN ACCOUNT?
            <span className="text-blue-500 ml-1 underline">SIGN IN</span>
          </a>
        </Link>
        {error && (
          <span className="text-red-500 block ">Something Went Wrong...</span>
        )}
      </div>
    </div>
  );
};

export default Register;
