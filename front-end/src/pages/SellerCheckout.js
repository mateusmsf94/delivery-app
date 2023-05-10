import { useEffect } from 'react';
import fetchData from '../utils/requestAPI';
import NavSeller from '../components/NavSeller';

export default function SellerCheckout() {
  const url = 'http://localhost:3001/products/1';

  useEffect(() => {
    const getProductData = async () => {
      const fetch = await fetchData(url);
      console.log(fetch);
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

// http://localhost:3001/products/1
