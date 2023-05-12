import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../MyContext';
import NavCustomer from '../components/NavCustomer';

import fetchData from '../utils/requestAPI';
import CheckoutTable from '../components/CheckoutTable';
import refreshTotalPrice from '../utils/refreshTotalPrice';
import SelectInput from '../components/SelectInput';

export default function Checkout() {
  const { dataFetch } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [qty, setQty] = useState({});
  const history = useHistory();

  const [sellerId, setSellerId] = useState(0);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

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

    async function getSellers() {
      setSellers(await fetchData('http://localhost:3001/products/sellers'));
    }

    getProductData();
    getSellers();
  }, [dataFetch]);

  const validateFields = totalPrice === 0
  || sellerId === ''
  || address === ''
  || number === '';

  const createSale = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!validateFields && user) {
      try {
        const response = await fetch('http://localhost:3001/sales/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.token,
          },
          body: JSON.stringify({
            userId: user.id,
            sellerId,
            totalPrice,
            address,
            number,
            qty,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Response from server:', data);
          history.push(`/customer/orders/${data.id}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <NavCustomer />
      <CheckoutTable
        props={ { totalPrice, products, qty, removeItem } }
      />
      <div className="w-4/5 mx-auto flex flex-wrap max-w-full justify-center">
        <h3 className="font-semibold mt-6 w-full">Detalhes e Endereço para Entrega</h3>
        <div className="mt-2 w-1/5 mr-2">
          <SelectInput
            sellers={ sellers }
            value={ sellerId }
            handleChange={ ({ target: { value } }) => setSellerId(value) }
          />
        </div>
        <div className="mt-2 w-2/6">
          <label htmlFor="type-address" className="font-normal text-xs m-2 w-full">
            Endereço
            <input
              data-testid="customer_checkout__input-address"
              placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
              className="border border-black rounded p-2 block w-full"
              name="type-address"
              type="text"
              onChange={ ({ target: { value } }) => setAddress(value) }
              value={ address }
            />
          </label>
        </div>
        <div className="mt-2 w-1/6 ml-2">
          <label htmlFor="type-number" className="font-normal text-xs m-2 w-full">
            Número
            <input
              data-testid="customer_checkout__input-address-number"
              placeholder="198"
              className="border border-black rounded p-2 block w-full"
              name="type-number"
              type="number"
              onChange={ ({ target: { value } }) => setNumber(value) }
              value={ number }
            />
          </label>
        </div>
        <div className="w-full text-center my-4">
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            className="py-2 px-8 bg-darkgreen text-white rounded uppercase font-semibold"
            onClick={ () => createSale() }
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </>
  );
}
