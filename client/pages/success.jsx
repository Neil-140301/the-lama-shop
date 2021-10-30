import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Success = () => {
  const router = useRouter();
  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center',
      }}
      className="flex justify-center items-center h-screen "
    >
      <div className="shadow-lg border rounded-2xl p-8 flex flex-col items-center space-y-6 justify-center w-[300px] h-[450px] bg-gray-50 ">
        <div className="relative h-[60px] w-[60px] rounded-full p-10 border-2 border-gray-500 overflow-hidden ">
          <Image
            src="https://avatars.githubusercontent.com/u/1486366?v=4"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="text-lg text-center ">
          Hooray! Your Payment was successful.
        </p>
        <Link href="/">
          <button className="bg-green-700 text-white p-4 transform transition duration-500 ease-in-out hover:scale-110 rounded-lg font-medium ">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
