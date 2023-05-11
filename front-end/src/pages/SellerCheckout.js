import { useEffect, useContext, useState } from 'react';
import fetchData from '../utils/requestAPI';
import NavSeller from '../components/NavSeller';
import MyContext from '../MyContext';

export default function SellerCheckout() {
  const { dataFetch } = useContext(MyContext);
  const [dataResult, setDataResult] = useState({});
  const [dataSale, setDataSale] = useState([]);

  const url = 'http://localhost:3001/sales/1';
  const url2 = 'http://localhost:3001/sales/product/1';

  const four = 4;

  const header = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total',
  ];

  const formatDate = () => {
    const date = new Date(dataResult.saleDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const validDate = `${day}-${month}-${year}`;

    return validDate.replace(/-/g, '/');
  };

  useEffect(() => {
    const getProductData = async () => {
      const fet = await fetchData(url);
      setDataResult(fet);

      setDataSale(await fetchData(url2));
    };
    getProductData();
  }, []);

  console.log('dataResult', dataResult);

  return (
    <div>
      <NavSeller />
      <h3>Detalhe do Pedido</h3>
      <div className="details">
        <p
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `PEDIDO ${dataResult.id?.toString().padStart(four, '0')}`}
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { formatDate()}
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { dataResult.status }
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
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
            { dataFetch.map((ele, index) => (
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
                  { ele.name}
                </td>
                <td className="bg-lightgray text-black font-normal">
                  10
                  {/* { ele[dataSale.productId]} */}
                </td>
                <td className="bg-blue">
                  {'R$ '}
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    {/* { ele.price.replace('.', ',') } */}
                  </span>
                </td>
                <td className="bg-blue">
                  {'R$ '}
                  <span
                    data-testid={
                      `seller_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    {/* { ele.price * 2 } */}
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
