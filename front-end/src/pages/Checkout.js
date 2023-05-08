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
      <h3>Detalhes e Endereço para Entrega</h3>
      <div className="bg-gray-100 w-4/5 mx-auto">
        <label htmlFor="select-seller">
          P. Vendedora Responsável:
          <input
            name="select-seller"
            type="select"
          />
        </label>

        <label htmlFor="type-address">
          Endereço
          <input
            name="type-address"
            type="text"
          />
        </label>

        <label htmlFor="type-number">
          Número
          <input
            name="type-number"
            type="number"
          />
        </label>

        <button
          type="button"
        >
          Finalizar Pedido
        </button>
      </div>
    </>
  );
}
