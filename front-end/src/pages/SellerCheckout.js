import { useEffect, useContext } from 'react';
import fetchData from '../utils/requestAPI';
import NavSeller from '../components/NavSeller';
import MyContext from '../MyContext';

export default function SellerCheckout() {
  const { dataFetch } = useContext(MyContext);

  const url = 'http://localhost:3001/sales/1';

  useEffect(() => {
    const getProductData = async () => {
      const fetch = await fetchData(url);
      console.log('ID SALE', fetch);
      console.log('PRODUTOS', dataFetch);
      return fetch;
    };

    getProductData();
  });
  return (
    <div>
      <NavSeller />
      <h3>Detalhe do Pedido</h3>
    </div>
  );
}
