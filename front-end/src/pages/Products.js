import { useHistory } from 'react-router-dom';
import NavCustomer from '../components/NavCustomer';

export default function Products() {
  const history = useHistory();

  // Mudar para produto, quando implementar o back-end
  const teste = [
    {
      id: 2,
      name: 'Heineken 600ml',
      price: 7.50,
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
    },
  ];

  const useNavBar = () => {
    if (history.path === '/customer/products') {
      return (<NavCustomer />);
    }
  };

  return (
    <>
      { useNavBar() }
      <main>
        {
          // Mudar para produto, quando implementar o back-end
          teste.map(({ id, name, price, urlImage }) => (
            <div
              key={ id }
            >
              <img
                url={ urlImage }
                alt={ name }
                data-testid={ `customer_products__img-card-bg-image-${id}` }
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
