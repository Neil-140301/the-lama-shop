import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import Image from 'next/image';
import Link from 'next/link';

const Product = ({ item }) => {
  return (
    <div
      className="flex-1 m-[5px] min-w-[280px] h-[350px] flex items-center
      justify-center bg-[#f5fbfd] relative group cursor-pointer  "
    >
      {/* circle */}
      <div className="w-[200px] h-[200px] rounded-full bg-white absolute "></div>

      {/* image */}
      <div className="relative w-full h-3/4 z-[2] ">
        <Image src={item.img} layout="fill" objectFit="contain" />
      </div>

      {/* info */}
      <div
        className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] z-[3]
        flex items-center justify-center opacity-0 group-hover:opacity-100 transition
        duration-500 ease-in-out "
      >
        <div
          className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center
          m-[10px] hover:bg-[#e9f5f5] transform hover:scale-110 transition duration-500 cursor-pointer "
        >
          <ShoppingCartOutlined />
        </div>
        <div
          className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center
          m-[10px] hover:bg-[#e9f5f5] transform hover:scale-110 transition duration-500 cursor-pointer "
        >
          <Link href={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </div>
        <div
          className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center
          m-[10px] hover:bg-[#e9f5f5] transform hover:scale-110 transition duration-500 cursor-pointer "
        >
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default Product;
