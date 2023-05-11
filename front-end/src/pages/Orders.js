import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavCustomer from '../components/NavCustomer';
import fetchData from '../utils/requestAPI';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const orderFix = 4;

  useEffect(() => {
    async function getOrders() {
      const user = JSON.parse(localStorage.getItem('user'));
      setOrders(await fetchData(`http://localhost:3001/sales/${user.id}`));
    }

    getOrders();
  }, []);

  const formateDate = (fullDate) => {
    const date = new Date(fullDate);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formated = date.toLocaleDateString('en-GB', options);
    return formated;
  };

  return (
    <>
      <NavCustomer />
      <main className=" w-4/5 grid grid-cols-2 mx-auto mt-2">
        {!orders ? null
          : orders.map((order) => (
            <Link
              key={ order.id }
              to={ `/customer/orders/${order.id}` }
              className="border shadow-md rounded m-2"
            >
              <p>
                Pedido
                <span data-testid={ `customer_orders__element-order-id-${order.id}` }>
                  { (order.id).toString().padStart(orderFix, '0') }
                </span>
              </p>
              <div data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
                { order.status }
              </div>
              <div>
                <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
                  { formateDate(order.saleDate) }
                </p>
                <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
                  {'R$ '}
                  <span>
                    { (order.totalPrice).toString().replace('.', ',') }
                  </span>
                </p>
              </div>
            </Link>
          ))}
      </main>
    </>
  );
}
