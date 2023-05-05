import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavCustomer() {
  const [user, setUser] = useState({});
  // const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || [];
    setUser(data);
  }, []);

  const logOut = () => localStorage.removeItem('user');

  return (
    <nav>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <p data-testid="customer_products__element-navbar-user-full-name">
        { user.name }
      </p>
      <Link to="/login">
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
