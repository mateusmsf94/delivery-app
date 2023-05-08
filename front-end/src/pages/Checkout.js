import { useContext, useEffect, useState } from 'react';
import MyContext from '../MyContext';
import NavCustomer from '../components/NavCustomer';

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

  function getProductData() {
    const productsQty = JSON.parse(localStorage.getItem('myProducts')) || [];

    const productData = dataFetch
      .map((product) => (productsQty[product.id] ? product : ''))
      .filter((product) => product !== '');

    const price = refreshTotalPrice(productData, productsQty);

    setTotalPrice(price);
    setQty(productsQty);
    setProducts(productData);
  }

  useEffect(() => {
    getProductData();
  }, []);

  // function refreshTotal() {

  // }

  return (
    <>
      <NavCustomer />
      <h3>Finalizar Pedido</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { products.map(({ id, name, price }, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1}
              </td>
              <td
                data-testid={
                  `24: customer_checkout__element-order-table-name-${index}`
                }
              >
                { name }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
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
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  onClick={ () => removeItem(id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              data-testid="customer_checkout__element-order-total-price"
            >
              { totalPrice.toFixed(2).replace('.', ',')}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
