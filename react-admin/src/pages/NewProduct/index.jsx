import { useCallback, useState } from 'react';
import './index.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
import { createProduct } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { Publish } from '@material-ui/icons';

export default function NewProduct() {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.product);

  const handleChange = useCallback((e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleCategories = useCallback((e) => {
    setCategories(e.target.value.split(','));
  }, []);

  const handleSize = useCallback((e) => {
    setSize(e.target.value.split(','));
  }, []);

  const handleColor = useCallback((e) => {
    setColor(e.target.value.split(','));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {
              ...data,
              img: downloadURL,
              category: categories,
              size,
              color,
            };
            createProduct(dispatch, product);
            setSuccess(true);
          });
        }
      );
    },
    [file, data, categories, dispatch, size, color]
  );

  return (
    <div className="newProduct p-8 overflow-hidden relative ">
      <h1 className="p-2 pl-0 text-bold text-2xl ">Add a New Product</h1>
      <form className="addProductForm ">
        <div className="addProductItem uploadImg items-center ">
          <label>Image</label>
          <label className="cursor-pointer " htmlFor="file">
            <Publish />
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="file"
            className="hidden"
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            className="border-b outline-none "
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Apple Airpods"
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            className="border-b outline-none "
            onChange={handleChange}
            name="desc"
            type="text"
            placeholder="description..."
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            className="border-b outline-none "
            name="price"
            onChange={handleChange}
            type="number"
            placeholder="100"
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            className="border-b outline-none "
            onChange={handleCategories}
            type="text"
            placeholder="jeans, shirts"
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            className="border-b outline-none "
            onChange={handleSize}
            type="text"
            placeholder="xs,s,m"
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            className="border-b outline-none "
            onChange={handleColor}
            type="text"
            placeholder="red,black"
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select
            className="outline-none"
            name="inStock"
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button
          disabled={isFetching}
          onClick={handleSubmit}
          className="addProductButton"
        >
          Create
        </button>
      </form>
      {error && <span className="text-red-500 ">Something Went Wrong...</span>}
      {success && (
        <span className="text-green-500 mt-4 ">Created successfully...</span>
      )}
      <div className="clip"></div>
    </div>
  );
}
