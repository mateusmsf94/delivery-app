import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavCustomer from '../components/NavCustomer';
import MyContext from '../MyContext';

import refreshTotalPrice from '../utils/refreshTotalPrice';

export default function Products() {
  const { dataFetch } = useContext(MyContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [qty, setQty] = useState({});

  function refreshCarPrice() {
    setTotalPrice(refreshTotalPrice(dataFetch, qty));

    if (totalPrice > 0) { setIsDisabled(false); } else { setIsDisabled(true); }
  }

  // Obten do localstorage
  useEffect(() => {
    const quantidade = JSON.parse(localStorage.getItem('myProducts')) || [];
    setQty(quantidade);
  }, []);

  // Salva no localstorage
  useEffect(() => {
    localStorage.setItem('myProducts', JSON.stringify(qty));
    refreshCarPrice();
  });

  function updateQty(id, method) {
    const productQty = qty[id] || 0;
    if (method === 'add') { setQty({ ...qty, [id]: (productQty + 1) }); }

    if (method === 'rm') {
      const notZero = (productQty !== 0);
      if (notZero) { setQty({ ...qty, [id]: (productQty - 1) }); }
    }
  }

  function validateInput(id, value) {
    if (value > 0) { setQty({ ...qty, [id]: value }); }
  }

  return (
    <>
      <NavCustomer />
      <main className="flex flex-wrap justify-center">
        {
          dataFetch.map(({ id, name, price, urlImage }) => (
            <div
              className={ `w-56 h-80 border m-3 bg-gray-100
                shadow-md rounded-bl rounded-br` }
              key={ id }
            >
              <p
                className={ `absolute m-3 bg-neutral-500
                  bg-opacity-30 p-1 rounded font-bold` }
              >
                R$
                <span data-testid={ `customer_products__element-card-price-${id}` }>
                  { price.replace('.', ',') }
                </span>
              </p>
              <img
                src={ urlImage }
                alt={ name }
                data-testid={ `customer_products__img-card-bg-image-${id}` }
                className={ `object-cover w-full h-56 p-2 object-scale-down 
                  bg-white aspect-ratio-3/2` }
              />
              <p
                data-testid={ `customer_products__element-card-title-${id}` }
                className="text-center text-darkgreen mt-2"
              >
                { name }
              </p>
              <div className="flex justify-center mt-1">
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-rm-item-${id}` }
                  onClick={ () => updateQty(id, 'rm') }
                  className={ `bg-darkgreen text-white text-bold w-9 h-9 rounded-tl-md
                    rounded-bl-md text-3xl` }
                >
                  -
                </button>
                <input
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                  type="number"
                  onChange={ ({ target: { value } }) => validateInput(id, value) }
                  value={ qty[id] || 0 }
                  className={ `w-10 text-center border-t border-b border-darkgreen
                    appearance-none [-moz-appearance:_textfield] 
                    [&::-webkit-outer-spin-button]:m-0
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:m-0 
                    [&::-webkit-inner-spin-button]:appearance-none` }
                />
                <button
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                  type="button"
                  onClick={ () => updateQty(id, 'add') }
                  className={ `bg-darkgreen text-white text-bold w-9 h-9 rounded-tr-md
                  rounded-br-md text-3xl` }
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
        <Link
          to="/customer/checkout"
          // disabled={ isDisabled }
        >
          <button
            type="button"
            data-testid="customer_products__button-cart"
            className={ `fixed bottom-0 right-0 m-3 bg-darkgreen
            text-white text-bold p-2 rounded` }
            disabled={ isDisabled }
          >
            Ver carrinho: R$
            <span data-testid="customer_products__checkout-bottom-value">
              { totalPrice.toFixed(2).replace('.', ',') }
            </span>
          </button>
        </Link>
      </main>
    </>
  );
}
