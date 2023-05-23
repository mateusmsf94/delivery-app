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
      const url = `http://localhost:3001/sales/user/${user.id}`;
      setOrders(await fetchData(url));
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
      <main className=" w-4/5 mx-auto mt-6">
        {!orders ? null
          : orders.map((order) => (
            <Link
              key={ order.id }
              to={ `/customer/orders/${order.id}` }
              className={ `w-4/5 mx-auto border shadow-md rounded m-2 
                flex bg-lightgray h-24 items-center` }
            >
              <p className="bg-white h-full w-1/4 text-center pt-5 font-light rounded-l">
                Pedido
                <span
                  data-testid={ `customer_orders__element-order-id-${order.id}` }
                  className="block text-center font-normal"
                >
                  { (order.id).toString().padStart(orderFix, '0') }
                </span>
              </p>
              <div
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
                className={ `m-2 h-20 rounded w-3/5 flex justify-center items-center
                font-semibold uppercase text-xl
                ${order.status === 'Entregue' ? 'bg-darkgreen' : ''}
                ${order.status === 'Pendente' ? 'bg-yellow-300' : ''}
                ${order.status === 'Preparando' ? 'bg-lime-400' : ''}
                ${order.status === 'Em Trânsito' ? 'bg-blue' : ''}` }
              >
                { order.status }
              </div>
              <div className="flex-wrap w-2/5 mr-2 font-semibold text-xl">
                <p
                  data-testid={ `customer_orders__element-order-date-${order.id}` }
                  className="bg-white mb-2 h-9 rounded flex justify-center items-center"
                >
                  { formateDate(order.saleDate) }
                </p>
                <p
                  data-testid={ `customer_orders__element-card-price-${order.id}` }
                  className="bg-white h-9 rounded flex justify-center items-center"
                >
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
