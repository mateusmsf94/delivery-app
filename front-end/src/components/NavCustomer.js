import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavCustomer() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || [];
    setUser(data);
  }, []);

  const logOut = () => localStorage.removeItem('user');

  let testid;
  let title;

  switch (user.role) {
  case 'customer':
    testid = 'customer_products__element-navbar-link-products';
    title = 'Produtos';
    break;

  case 'seller':
    testid = 'customer_products__element-navbar-link-orders';
    title = 'PEDIDOS';
    break;
  default:
    break;
  }

  return (
    <nav className="navBar">
      <Link className="navProduct" to="/customer/products" data-testid={ testid }>
        {title}
      </Link>
      {user.role === 'seller' ? (
        <div className="navPedidos" />
      ) : (
        <Link
          className="navPedidos"
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
      )}
      <p
        data-testid="customer_products__element-navbar-user-full-name"
        className="navUser text-center text-black-950"
      >
        {user.name}
      </p>
      <Link to="/login" className="navLogout">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logOut }
        >
          Sair
        </button>
      </Link>
    </nav>
  );
}
