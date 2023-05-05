import { useEffect, useState } from 'react';
import NavCustomer from '../components/NavCustomer';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3001/products/');
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getData = async () => {
      setProducts(await fetchProducts());
    };

    getData();
  }, []);

  // Imprimi quantidade dos produtos
  // useEffect(() => {
  //   console.log(qty);
  // });

  return (
    <>
      <NavCustomer />
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
      </main>
    </>
  );
}
