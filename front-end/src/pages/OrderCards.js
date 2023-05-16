import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import NavSeller from '../components/NavSeller';
import fetchData from '../utils/requestAPI';
import formateDate from '../utils/formateDate';

export default function OrderCards() {
  const [dataResult, setDataResult] = useState([]);

  const realURL = 'http://localhost:3001/sales/orders';

  const four = 4;

  const history = useHistory();
  const pathName = history.location.pathname;

  const getProductData = async () => {
    const data = await fetchData(realURL);
    if (data !== null && data !== undefined) {
      setDataResult(data);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <>
      <NavSeller />
      <div>
        { dataResult.map((ele, index) => (
          <div key={ index }>
            <Link
              to={ `${pathName}/${ele.id}` }
            >
              <p data-testid={ `seller_orders__element-order-id-${ele.id}` }>
                {`PEDIDO ${ele.id?.toString().padStart(four, '0')}`}
              </p>
              <p data-testid={ `seller_orders__element-delivery-status-${ele.id}` }>
                {ele.status}
              </p>
              <p data-testid={ `seller_orders__element-order-date-${ele.id}` }>
                { formateDate(ele.saleDate)}
              </p>
              <p data-testid={ `seller_orders__element-card-price-${ele.id}` }>
                { ele.totalPrice }
              </p>
              <p data-testid={ `seller_orders__element-card-address-${ele.id}` }>
                { `${ele.deliveryAddress}, ${ele.deliveryNumber}` }
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
