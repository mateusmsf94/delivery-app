import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavAdmin() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || [];
    setUser(data);
  }, []);

  return (
    <nav className="navBar">
      <p data-testid="customer_products__element-navbar-link-orders">
        GERENCIAR USUÁRIOS
      </p>
      <div>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
          className="navUser text-center text-black-950"
        >
          { user.name }
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
      </div>
    </nav>
  );
}
