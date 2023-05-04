import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavCustomer from '../components/NavCustomer';

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3001/products/');
    const data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    const getData = async () => {
      setProducts(await fetchProducts());
    };

    getData();
  }, []);

  const useNavBar = () => {
    if (useLocation().pathname === '/customer/products') {
      return (<NavCustomer />);
    }
  };

  return (
    <>
      { useNavBar() }
      <main>
        {
          products.map(({ id, name, price, urlImage }) => (
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
                >
                  -
                </button>
                <input
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                  type="number"
                  // onChange={ ({ target: { value } }) => setInput(value) }
                  // value={ inputValue }
                />
                <button
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
      </main>
    </>
  );
}
