import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchData from '../utils/requestAPI';
import NavSeller from '../components/NavSeller';

export default function SellerCheckout() {
  const [dataResult, setDataResult] = useState([]);

  const history = useHistory();

  const pathName = history.location.pathname;
  const realURL = `http://localhost:3001/sales/${pathName.charAt(pathName.length - 1)}`;

  const four = 4;

  const header = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total',
  ];

  const getProductData = async () => {
    const data = await fetchData(realURL);
    if (data !== null && data !== undefined) {
      setDataResult(data);
    }
  };

  const className = (status) => {
    let statusClass = '';
    switch (status) {
    case 'Preparando':
      statusClass = 'bg-blue';
      break;
    case 'Em Trânsito':
      statusClass = 'bg-red-500';
      break;
    case 'Pendente':
      statusClass = 'bg-yellow-500';
      break;
    default:
    }

    return statusClass;
  };

  const updateStatusOrder = async (status) => {
    try {
      const id = `${pathName.charAt(pathName.length - 1)}`;
      const response = await fetch('http://localhost:3001/sales/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from server:', data);
        getProductData();
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = () => {
    const date = new Date(dataResult.saleDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const validDate = `${day}-${month}-${year}`;

    return validDate.replace(/-/g, '/');
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="w-4/5 mx-auto mt-4">
      <NavSeller />
      <h3 className="font-semibold">Detalhe do Pedido</h3>
      <div className="details">
        <p
          className="font-bold text-gray-800 mb-2"
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `PEDIDO ${dataResult.id?.toString().padStart(four, '0')}`}
        </p>
        <p
          className="font-bold text-gray-800 mb-2"
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { formatDate()}
        </p>
        <p
          className={ `font-bold text-gray-800 mb-2 pendente
          ${className(dataResult.status)}` }
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { dataResult.status }
        </p>
        <button
        // colocar className "button" para efeito de mouseOver
          className={ `font-bold text-gray-800 mb-2 saiu
          ${dataResult.status !== 'Pendente' ? 'disabled' : ''}` }
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ dataResult.status !== 'Pendente' }
          onClick={ () => updateStatusOrder('Preparando') }
        >
          PREPARAR PEDIDO
        </button>
        <button
        // colocar className "button" para efeito de mouseOver
          className={ `font-bold text-gray-800 mb-2 preparar
          ${dataResult.status !== 'Preparando' ? 'disabled' : ''}` }
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ dataResult.status !== 'Preparando' }
          onClick={ () => updateStatusOrder('Em Trânsito') }
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <div>
        <table className="w-full border">
          <thead>
            <tr>
              { header.map((option, index) => (
                <th key={ index } className="font-normal text-xs p-2">{option}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center p-4 text-white font-semibold">
            { dataResult.product?.map((ele, index) => (
              <tr key={ index } className="text-center p-4 text-white font-semibold">
                <td
                  className={ `bg-lightgreen px-1 py-1 text-black border-r-1
                  border-l-1 rounded-tl-md rounded-bl-md` }
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  className="bg-lightgray text-black font-normal"
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  { ele.name }
                </td>
                <td className="bg-darkgreen text-black font-normal">
                  { ele.SaleProduct.quantity }
                </td>
                <td className="bg-purple">
                  {'R$ '}
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    { ele.price.replace('.', ',') }
                  </span>
                </td>
                <td className="bg-blue">
                  {'R$ '}
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    { (ele.price * ele.SaleProduct.quantity).toFixed(2) }
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          className="w-full text-right pr-4 font-bold text-white bg-darkgreen"
          colSpan="6"
        >
          {'TOTAL: R$ '}
          { dataResult.totalPrice }

        </p>
      </div>
    </div>
  );
}
