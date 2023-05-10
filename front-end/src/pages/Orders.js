import { useEffect, useState } from 'react';
import NavCustomer from '../components/NavCustomer';
import fetchData from '../utils/requestAPI';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const user = JSON.parse(localStorage.getItem('user'));
      setOrders(await fetchData(`http://localhost:3001/sales/${user.id}`));
    }

    getOrders();
  }, []);

  return (
    <>
      <NavCustomer />
      <main>
        {orders ? null
          : orders.map((order) => (
            <div key={ order.id }>
              <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
                {`Pedido ${order.id}`}
              </p>
              <div data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
                { order.status }
              </div>
              <div>
                <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
                  { order.saleDate }
                </p>
                <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
                  { order.totalPrice }
                </p>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}
