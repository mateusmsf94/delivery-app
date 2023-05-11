import { useEffect, useContext, useState } from 'react';
import fetchData from '../utils/requestAPI';
import NavSeller from '../components/NavSeller';
import MyContext from '../MyContext';

export default function SellerCheckout() {
  const { dataFetch } = useContext(MyContext);
  const [dataResult, setDataResult] = useState({});

  const url = 'http://localhost:3001/sales/1';

  const four = 4;

  const header = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total',
  ];

  const formatDate = () => {
    const dataString = '2023-05-10T22:45:13.000Z';
    const date = new Date(dataString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const validDate = `${day}-${month}-${year}`;
    console.log(validDate.replace(/-/g, '/'));
    return validDate;
  };

  useEffect(() => {
    const getProductData = async () => {
      const fetch = await fetchData(url);

      console.log(fetch);
      console.log('dataResult', dataResult);
      return setDataResult(fetch);
    };

    getProductData();
    formatDate();
  }, []);

  return (
    <div>
      <NavSeller />
      <div>
        <h3>Detalhe do Pedido</h3>
        <p
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          {/* { `PEDIDO ${dataResult.id.padStart(four, '0')}`} */}
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          10/05/2023
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          {/* { dataFetch.status } */}
        </p>
        <div>
          <table className="w-full border">
            <thead>
              { header.map((option, index) => (
                <th key={ index } className="font-normal text-xs p-2">{option}</th>
              ))}
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}
