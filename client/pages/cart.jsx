import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { Add, DeleteOutline, Remove } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useCallback, useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deleteProduct, emptyCart } from '../redux/cartSlice';

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

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = useCallback((token) => setStripeToken(token), []);

  const handleDelete = useCallback((product) => {
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
      })
    );
    console.log(product);
  }, []);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post(`/checkout/payment`, {
          tokenId: stripeToken.id,
          amount: 500,
        });
        console.log(res);
        dispatch(emptyCart());
        router.replace(
          {
            pathname: '/success',
            query: { paymentData: JSON.stringify(res.data) },
          },
          '/success'
        );
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart, router]);

  return (
    <div>
      <Navbar />
      <Announcement />

      <div className="p-[10px] sm:p-[20px] ">
        <h1 className="font-light text-center text-2xl ">YOUR BAG</h1>
        {/* top */}
        <div className="flex items-center justify-between p-[20px] ">
          <Link href="/">
            <button className="p-[10px] font-semibold cursor-pointer bg-transparent border-2 text-xs border-black ">
              CONTINUE SHOPPING
            </button>
          </Link>

          <div className="hidden sm:block">
            <span className="underline cursor-pointer mx-[10px] ">
              Shopping Bag({cart.products.length})
            </span>
            <span className="underline cursor-pointer mx-[10px] ">
              Your Wishlist(0)
            </span>
          </div>

          <button
            onClick={() => dispatch(emptyCart())}
            className="p-[10px] font-semibold cursor-pointer bg-black text-white text-xs "
          >
            EMPTY CART
          </button>
        </div>

        {/* bottom */}
        <div className="flex justify-between flex-col sm:flex-row ">
          {/* info */}
          <div className="flex-[3] ">
            {/* product details */}
            {cart.products.map((product) => (
              <div
                key={product._id}
                className="flex justify-between flex-col sm:flex-row border-b "
              >
                <div className="flex-[2] flex ">
                  <div className="relative w-[200px] h-[262px] ">
                    <Image
                      src={
                        product.img ||
                        'https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388'
                      }
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="p-[20px] flex flex-col justify-around ">
                    <span className="">
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="">
                      <b>ID:</b> {product._id}{' '}
                    </span>
                    <span
                      className={`w-[20px] h-[20px] rounded-full ${colorClass(
                        product.color
                      )} cursor-pointer `}
                    ></span>
                    <span className="">
                      <b>Size:</b> {product.size.toUpperCase()}{' '}
                    </span>
                  </div>
                </div>

                {/* amt */}
                <div className="flex-1 flex items-center justify-center flex-col">
                  {/* amt container */}
                  <div className="flex items-center mb-[20px] ">
                    <Add />
                    <span className="text-[24px] my-[5px] mx-[15px] sm:mx-[5px] ">
                      {product.quantity}
                    </span>
                    <Remove />
                  </div>
                  <span className="text-[30px] font-extralight mb-[20px] sm:mb-0 ">
                    $ {product.price * product.quantity}
                  </span>
                  <DeleteOutline
                    onClick={() => handleDelete(product)}
                    className="text-red-600 mt-6 cursor-pointer "
                  />
                </div>
              </div>
            ))}

            <hr className="bg-[#eee] h-[1px] " />
          </div>

          {/* summary */}
          <div className="flex-1 w-full border rounded-[10px] p-[20px] self-start md:h-[50vh] ">
            <h1 className="font-extralight text-2xl ">ORDER SUMMARY</h1>
            <div className="my-[30px] flex justify-between ">
              <span className=" ">Subtotal</span>
              <span className=" ">$ {cart.total}</span>
            </div>
            <div className="my-[30px] flex justify-between ">
              <span className=" ">Estimated Shipping</span>
              <span className=" ">$ 5.90</span>
            </div>
            <div className="my-[30px] flex justify-between ">
              <span className=" ">Discount</span>
              <span className=" ">$ -5.90</span>
            </div>
            <div className="my-[30px] flex justify-between font-medium text-[24px] ">
              <span className=" ">Total</span>
              <span className=" ">$ {cart.total}</span>
            </div>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
            >
              <button className="w-full p-[10px] bg-black text-white font-semibold ">
                CHECKOUT NOW
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
