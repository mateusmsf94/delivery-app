import { Link } from 'react-router-dom';

export default function NavCustomer() {
  return (
    <nav>
      <Link to="/customer/products">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </button>
      </Link>
      <Link to="/customer/orders">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </button>
      </Link>
      <p data-testid="customer_products__element-navbar-user-full-name">
        {/* Trocar pelo nome do usuario */}
        TESTE
      </p>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </nav>
  );
}
