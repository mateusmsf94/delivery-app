import { useState, useContext, useEffect } from 'react';
import NavCustomer from '../components/NavCustomer';
import MyContext from '../MyContext';

export default function Products() {
  const [qty, setQty] = useState({});

  const { dataFetch } = useContext(MyContext);

  // Obten do localstorage
  useEffect(() => {
    const quantidade = JSON.parse(localStorage.getItem('myProducts')) || [];
    setQty(quantidade);
  }, []);

  // Salva no localstorage
  useEffect(() => {
    localStorage.setItem('myProducts', JSON.stringify(qty));
  });

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
                  onClick={ () => setQty({ ...qty, [id]: (qty[id] - 1) }) }
                >
                  -
                </button>
                <input
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                  type="number"
                  onChange={
                    ({ target: { value } }) => setQty({ ...qty, [id]: Number(value) })
                  }
                  value={ qty[id] || 0 }
                />
                <button
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                  type="button"
                  onClick={ () => setQty({ ...qty, [id]: ((qty[id] || 0) + 1) }) }
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
        <p>VER CARRINHO</p>
      </main>
    </>
  );
}

// const sendToLocalStorage = () => {
//   localStorage.setItem('myProducts', JSON.stringify(qty));
//   // console.log('ok');
// };
