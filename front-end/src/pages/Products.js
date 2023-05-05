import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavCustomer from '../components/NavCustomer';
import MyContext from '../MyContext';

export default function Products() {
  const { dataFetch, setTotalBill } = useContext(MyContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState({});

  function refreshCarPrice() {
    const priceList = dataFetch.map((product) => {
      const price = (qty[product.id] * product.price);
      const priceFixed = price ? price.toFixed(2) : 0;
      return Number(priceFixed);
    });

    setTotalPrice(priceList.reduce((acc, cur) => acc + cur, 0));
    setTotalBill(totalPrice);
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
      <main>
        {
          dataFetch.map(({ id, name, price, urlImage }) => (
            <div
              key={ id }
            >
              <img
                src={ urlImage }
                alt={ name }
                data-testid={ `customer_products__img-card-bg-image-${id}` }
                // Retirar tag e por no css
                width="100px"
              />
              <p data-testid={ `customer_products__element-card-price-${id}` }>
                { price }
              </p>
              <p data-testid={ `customer_products__element-card-title-${id}` }>
                { name }
              </p>
              <div>
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-rm-item-${id}` }
                  onClick={ () => updateQty(id, 'rm') }
                >
                  -
                </button>
                <input
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                  type="number"
                  onChange={ ({ target: { value } }) => validateInput(id, value) }
                  value={ qty[id] || 0 }
                />
                <button
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                  type="button"
                  onClick={ () => updateQty(id, 'add') }
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
        <Link
          to="/customer/checkout"
          data-testid="customer_products__button-cart"
        >
          <p data-testid="customer_products__checkout-bottom-value">
            { `Ver carrinho: R$${totalPrice.toFixed(2)}` }
          </p>
        </Link>
      </main>
    </>
  );
}
