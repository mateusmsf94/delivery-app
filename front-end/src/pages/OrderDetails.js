import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import NavCustomer from '../components/NavCustomer';
import fetchData from '../utils/requestAPI';
import formatDate from '../utils/formatDate';

export default function OrderDetails() {
  const header = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];
  const delivery = ['Pendente', 'Preparando', 'Entregue'];
  const ROUTE = 'customer_order_details';
  const [orderData, setOrderData] = useState({});
  const [orderId, setOrderId] = useState(0);
  const history = useHistory();
  const orderFix = 4;

  const getOrderData = useCallback(async () => {
    const { location: { pathname } } = history;
    const path = pathname.split('/');
    const id = path[path.length - 1];
    setOrderId(id);

    const url = `http://localhost:3001/sales/${id}`;
    const data = await fetchData(url);
    setOrderData(data);
  }, [history]);

  const updateStatusOrder = async (status) => {
    try {
      const response = await fetch('http://localhost:3001/sales/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId, status }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from server:', data);
        getOrderData();
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getOrderData();
  }, [getOrderData]);

  return (
    <>
      <NavCustomer />
      <div className="w-4/5 mx-auto mt-4 text-sm">
        <span>Detalhes do Pedido</span>
        <div className="border border-b-0 flex justify-between items-center h-8">
          <p className="font-semibold ml-2">
            {'PEDIDO '}
            <span
              data-testid={ `${ROUTE}__element-order-details-label-order-id` }
            >
              { (orderData.id || 0).toString().padStart(orderFix, '0') }
            </span>
          </p>
          <p>
            {'P. Vend: '}
            <span data-testid={ `${ROUTE}__element-order-details-label-seller-name` }>
              { !orderData.seller ? null : orderData.seller.name }
            </span>
          </p>
          <p
            data-testid={ `${ROUTE}__element-order-details-label-order-date` }
            className="bg-neutral-500 bg-opacity-30 rounded px-2"
          >
            { formatDate(orderData.saleDate) }
          </p>
          <p
            data-testid={ `${ROUTE}__element-order-details-label-delivery-status` }
            className="bg-green-300 rounded px-2"
          >
            { orderData.status }
          </p>
          <button
            type="button"
            className="bg-darkgreen rounded px-1 text-white text-sm mr-2"
            data-testid={ `${ROUTE}__button-delivery-check` }
            disabled={ delivery.includes(orderData.status) }
            onClick={ () => updateStatusOrder('Entregue') }
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      </div>
      <table className="w-4/5 border mx-auto">
        <thead>
          <tr>
            { header.map((option, i) => (
              <th key={ i } className="font-normal text-xs p-2">{option}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center p-4 text-white font-semibold">
          { (!orderData.product ? null
            : orderData.product.map(({ name, price, SaleProduct }, index) => (
              <tr key={ index } className="m-2 border-b-8 border-white">
                <td
                  className={ `bg-lightgreen px-1 py-1 text-black border-r-1
                border-l-1` }
                  data-testid={
                    `${ROUTE}__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1}
                </td>
                <td
                  className="bg-lightgray text-black font-normal"
                  data-testid={ `${ROUTE}__element-order-table-name-${index}` }
                >
                  { name }
                </td>
                <td className="bg-darkgreen">
                  <span
                    data-testid={
                      `${ROUTE}__element-order-table-quantity-${index}`
                    }
                  >
                    { SaleProduct.quantity }
                  </span>
                </td>
                <td className="bg-purple">
                  {'R$ '}
                  <span
                    data-testid={
                      `${ROUTE}__element-order-table-unit-price-${index}`
                    }
                  >
                    { price.toString().replace('.', ',') }
                  </span>
                </td>
                <td className="bg-blue">
                  {'R$ '}
                  <span
                    data-testid={
                      `${ROUTE}__element-order-table-sub-total-${index}`
                    }
                  >
                    { (SaleProduct.quantity * price).toFixed(2).replace('.', ',') }
                  </span>
                </td>
              </tr>
            )))}
        </tbody>
        <tfoot>
          <td
            className="w-full text-right pr-4 font-bold text-white bg-darkgreen"
            colSpan="6"
          >
            {'Total: R$ '}
            <span
              data-testid={ `${ROUTE}__element-order-total-price` }
            >
              { !orderData.totalPrice ? null
                : orderData.totalPrice.toString().replace('.', ',')}
            </span>
          </td>
        </tfoot>
      </table>
    </>
  );
}
