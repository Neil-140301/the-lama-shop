import Announcement from '../../components/Announcement';
import Navbar from '../../components/Navbar';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { Add, Remove } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';
import { addProduct } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';


const colorClass = (color) => {
  switch (color) {
    case 'white':
      return 'bg-[white]';
    case 'black':
      return 'bg-[black]';
    case 'red':
      return 'bg-[red]';
    case 'blue':
      return 'bg-[blue]';
    case 'green':
      return 'bg-[green]';
    case 'yellow':
      return 'bg-[yellow]';
  }
};

const Product = () => {
  const router = useRouter();
  const { productId } = router.query;
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const handleQuantity = useCallback((type) => {
    if (type === 'dec') {
      setQuantity((prev) => {
        return prev > 1 ? prev - 1 : 1;
      });
    } else {
      setQuantity((prev) => prev + 1);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(
      addProduct({ ...product, quantity, color, size, showMsg: setShowMsg })
    );
  }, [product, quantity, color, size]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${productId}`);
        setProduct(res.data);
      } catch (error) {}
    };

    getProduct();
  }, [productId]);

  return (
    <div>
      <Navbar />
      <Announcement />

      <div className="p-[10px] sm:p-[50px] flex flex-col sm:flex-row ">
        {/* image c */}
        <div className="relative flex-1 w-full h-[40vh] sm:h-[90vh] ">
          <Image
            src={product.img || 'https://i.ibb.co/S6qMxwr/jean.jpg'}
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* info */}
        <div className="flex-1 px-[10px] sm:px-[50px] ">
          <h1 className="font-extralight text-2xl ">{product.title}</h1>
          <p className="my-[20px] ">{product.desc}</p>
          <p className="font-thin text-[40px] ">$ {product.price}</p>

          {/* filters */}
          <div className="flex justify-between sm:w-1/2 my-[30px] space-x-3 ">
            {/* filter */}
            <div className="flex items-center space-x-2">
              <span className="text-[20px] font-extralight ">Color</span>
              {product.color?.map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-[20px] h-[20px] rounded-full border ${
                    color === c && 'ring border-0'
                  } ${colorClass(c)} mx-[5px] cursor-pointer `}
                ></div>
              ))}
            </div>

            <div className="flex items-center ">
              <span className="text-[20px] font-extralight ">Size</span>
              <select
                onChange={(e) => setSize(e.target.value)}
                className="ml-[10px] p-[5px] outline-none "
              >
                <option>size</option>
                {product.size?.map((s) => (
                  <option key={s} value={s} className="">
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* add */}
          <div className="flex items-center sm:w-1/2 justify-between ">
            {/* amount */}
            <div className="flex items-center font-bold ">
              <Remove
                onClick={() => handleQuantity('dec')}
                className="cursor-pointer"
              />
              <span
                className="w-[30px] h-[30px] rounded-[10px] border border-[teal]
                flex items-center justify-center mx-[5px] "
              >
                {quantity}
              </span>
              <Add
                onClick={() => handleQuantity('inc')}
                className="cursor-pointer"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="p-[15px] border-2 border-[teal] bg-white cursor-pointer whitespace-nowrap
              font-medium hover:bg-[#f8f4f4] "
            >
              ADD TO CART
            </button>
          </div>
          <div
            className={`mt-4 sm:w-3/4 lg:w-1/2 transition duration-300 ${
              !showMsg && 'opacity-0'
            }`}
          >
            <Alert
              variant="outlined"
              color="success"
              onClose={() => setShowMsg(false)}
            >
              Added to cart
            </Alert>
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
