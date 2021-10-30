import { Send } from '@material-ui/icons';
import { Alert } from '@mui/material';
import emailjs from 'emailjs-com';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const Newsletter = () => {
  const formRef = useRef();
  const [done, setDone] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      emailjs
        .sendForm(
          'service_h8iyemw',
          'template_qecmi8m',
          formRef.current,
          'user_aB5o9bPNynUR53tsgyAoO'
        )
        .then(
          (result) => {
            console.log(result.text);
            setDone(true);
          },
          (error) => {
            console.log(error.text);
          }
        );
    },
    [formRef]
  );

  return (
    <div className="h-[60vh] bg-[#fcf5f5] flex items-center justify-center flex-col ">
      {/* title */}
      <h1 className="font-semibold text-[70px] mb-[20px] ">Newsletter</h1>

      {/* desc */}
      <p className="text-[24px] font-light mb-[20px] text-center ">
        Get timely updates from your favorite products.
      </p>

      {/* info container */}
      <form
        className="w-[80%] sm:w-1/2 h-[40px] bg-white flex justify-between border "
        ref={formRef}
      >
        <input
          placeholder="Your email"
          type="text"
          className="outline-none flex-[8] pl-[20px] "
          name="user_email"
        />
        <button
          onClick={handleSubmit}
          className="flex-[1] bg-[teal] text-white "
        >
          <Send />
        </button>
      </form>

      <div className={`mt-4  transition duration-300 ${!done && 'opacity-0'}`}>
        <Alert
          variant="outlined"
          color="success"
          onClose={() => setDone(false)}
        >
          Thank you for subscribing!
        </Alert>
      </div>
    </div>
  );
};

export default Newsletter;
