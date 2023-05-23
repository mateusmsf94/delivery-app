import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavSeller from '../components/NavSeller';
import fetchData from '../utils/requestAPI';
import formateDate from '../utils/formateDate';

export default function OrderCards() {
  const [dataResult, setDataResult] = useState([]);

  const realURL = 'http://localhost:3001/sales/orders';

  const four = 4;

  // const history = useHistory();
  // const pathName = history.location.pathname;

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
      <main className=" w-4/5 mx-auto mt-6">
        { dataResult.map((ele, index) => (
          <Link
            key={ index }
            to={ `/seller/orders/${ele.id}` }
            className={ `w-4/5 mx-auto border shadow-md rounded m-2 
              flex flex-wrap bg-lightgray h-32 mb-4 justify-between` }
          >
            <p
              className="bg-white h-full w-1/4 text-center pt-10 font-light rounded-l"
              data-testid={ `seller_orders__element-order-id-${ele.id}` }
            >
              PEDIDO
              <span
                className="block text-center font-normal"
              >
                { (ele.id)?.toString().padStart(four, '0') }
              </span>
            </p>
            <p
              data-testid={ `seller_orders__element-delivery-status-${ele.id}` }
              className={ `m-2 h-20 rounded flex w-1/3 justify-center
                items-center font-semibold uppercase text-xl
                ${ele.status === 'Entregue' ? 'bg-darkgreen' : ''}
                ${ele.status === 'Pendente' ? 'bg-yellow-300' : ''}
                ${ele.status === 'Preparando' ? 'bg-lime-400' : ''}
                ${ele.status === 'Em Trânsito' ? 'bg-blue' : ''}` }
            >
              {ele.status}
            </p>
            <div className="flex-wrap w-2/6 mt-2 font-semibold text-xl mr-2">
              <p
                data-testid={ `seller_orders__element-order-date-${ele.id}` }
                className="bg-white mb-2 h-9 rounded flex justify-center items-center"
              >
                { formateDate(ele.saleDate)}
              </p>
              <p
                className="bg-white h-9 rounded flex justify-center items-center"
              >
                {'R$ '}
                <span data-testid={ `seller_orders__element-card-price-${ele.id}` }>
                  { ele.totalPrice.toString().replace('.', ',') }
                </span>
              </p>
            </div>
            <p
              data-testid={ `seller_orders__element-card-address-${ele.id}` }
              className="ml-auto -mt-8 mr-3"
            >
              { `${ele.deliveryAddress}, ${ele.deliveryNumber}` }
            </p>
          </Link>
        ))}
      </main>
    </>
  );
}
