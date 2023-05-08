import { useContext, useEffect, useState } from 'react';
import MyContext from '../MyContext';
import NavCustomer from '../components/NavCustomer';

export default function Checkout() {
  const { dataFetch } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});

  function getCarData() {
    const productData = dataFetch
      .map((product) => (qty[product.id] ? product : ''))
      .filter((product) => product !== '');

    setProducts(productData);
  }

  useEffect(() => {
    const productsQty = JSON.parse(localStorage.getItem('myProducts')) || [];
    setQty(productsQty);

    getCarData();
  }, []);

  return (
    <>
      <NavCustomer />
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </table>
      <tbody>
        {
          products.map(({ id, name, price }, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index }
              </td>
              <td
                data-testid={ `24: customer_checkout__element-order-table-name-${index}` }
              >
                { name }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { qty[id] }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { price }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { qty[id] * price }
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  // onClick={ remove() }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
      <p />
    </>
  );
}
