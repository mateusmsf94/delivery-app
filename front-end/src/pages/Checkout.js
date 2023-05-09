import { useContext, useEffect, useState } from 'react';
import MyContext from '../MyContext';
import NavCustomer from '../components/NavCustomer';

import CheckoutTable from '../components/CheckoutTable';
import refreshTotalPrice from '../utils/refreshTotalPrice';

export default function Checkout() {
  const { dataFetch } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState({});

  const removeItem = (id) => {
    const items = products.filter((ele) => ele.id !== id);
    const price = refreshTotalPrice(items, qty);

    setTotalPrice(price);
    setProducts(items);
  };

  useEffect(() => {
    function getProductData() {
      const productsQty = JSON.parse(localStorage.getItem('myProducts')) || [];
      setQty(productsQty);

      const productData = dataFetch
        .map((product) => (productsQty[product.id] ? product : ''))
        .filter((product) => product !== '');
      setProducts(productData);

      const price = refreshTotalPrice(productData, productsQty);
      setTotalPrice(price);
    }

    getProductData();
  }, [dataFetch]);

  return (
    <>
      <NavCustomer />
      <CheckoutTable
        props={ { totalPrice, products, qty, removeItem } }
      />
      <div className=" w-4/5 mx-auto flex flex-wrap max-w-full justify-center">
        <h3 className="font-semibold mt-6 w-full">Detalhes e Endereço para Entrega</h3>
        <div className="mt-2 w-1/5 mr-2">
          <label htmlFor="select-seller" className="font-normal text-xs">
            P. Vendedora Responsável:
            <input
              className="border border-black rounded p-2 w-full"
              name="select-seller"
              type="select"
            />
          </label>
        </div>
        <div className="mt-2 w-2/6">
          <label htmlFor="type-address" className="font-normal text-xs m-2 w-full">
            Endereço
            <input
              placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
              className="border border-black rounded p-2 block w-full"
              name="type-address"
              type="text"
            />
          </label>
        </div>
        <div className="mt-2 w-1/6 ml-2">
          <label htmlFor="type-number" className="font-normal text-xs m-2 w-full">
            Número
            <input
              placeholder="198"
              className="border border-black rounded p-2 block w-full"
              name="type-number"
              type="number"
            />
          </label>
        </div>
        <div className="w-full text-center my-4">
          <button
            type="button"
            className="py-2 px-8 bg-darkgreen text-white rounded uppercase font-semibold"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </>
  );
}
