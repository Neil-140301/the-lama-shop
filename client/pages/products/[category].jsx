import Announcement from '../../components/Announcement';
import Navbar from '../../components/Navbar';
import Products from '../../components/Products';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

const ProductList = () => {
  const router = useRouter();
  const { category } = router.query;

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');

  const handleFilter = useCallback((e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  }, []);

  return (
    <div className="">
      <Navbar />
      <Announcement />
      <h1 className="m-[20px] font-semibold text-2xl ">{category}</h1>
      <div className="flex justify-between ">
        {/* filter */}
        <div className="mx-[20px] sm:m-[20px] flex flex-col sm:block ">
          <span className="text-[20px] sm:mr-[20px] font-semibold ">
            Filter Products:
          </span>
          <select
            name="color"
            onChange={handleFilter}
            className="p-[10px] my-[10px] sm:my-0 sm:mr-[20px] outline-none "
          >
            <option disabled value="" className="">
              Color
            </option>
            <option value="white" className="">
              White
            </option>
            <option value="black" className="">
              Black
            </option>
            <option value="red" className="">
              Red
            </option>
            <option value="blue" className="">
              Blue
            </option>
            <option value="yellow" className="">
              Yellow
            </option>
            <option value="green" className="">
              Green
            </option>
          </select>
          <select
            name="size"
            onChange={handleFilter}
            className="p-[10px] my-[10px] sm:my-0 sm:mr-[20px] outline-none "
          >
            <option disabled value="" className="">
              Size
            </option>
            <option value="xs" className="">
              XS
            </option>
            <option value="s" className="">
              S
            </option>
            <option value="m" className="">
              M
            </option>
            <option value="l" className="">
              L
            </option>
            <option value="xl" className="">
              XL
            </option>
          </select>
        </div>
        <div className="mx-[20px] sm:m-[20px] flex flex-col sm:block ">
          <span className="text-[20px] sm:mr-[20px] font-semibold ">
            Sort Products:
          </span>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="p-[10px] my-[10px] sm:my-0 sm:mr-[20px] outline-none "
          >
            <option value="newest" className="">
              Newest
            </option>
            <option value="asc" className="">
              Price (asc)
            </option>
            <option value="desc" className="">
              Price (desc)
            </option>
          </select>
        </div>
      </div>
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;
