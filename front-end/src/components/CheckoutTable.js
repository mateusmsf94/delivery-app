import PropTypes from 'prop-types';
// import { useEffect } from 'react';

export default function CheckoutTable({ props }) {
  const { totalPrice, qty, removeItem, products } = props;

  if (!products || !qty || !products) {
    return null;
  }

  return (
    <>
      <h3>Finalizar Pedido</h3>
      <table className="bg-gray-100 w-4/5 mx-auto">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody className="text-center">
          { (products).map(({ id, name, price }, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1}
              </td>
              <td
                data-testid={
                  `24: customer_checkout__element-order-table-name-${index}`
                }
              >
                { name }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                { qty[id] }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { price }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { qty[id] * price }
              </td>
              <td>
                <button
                  type="button"
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  onClick={ () => removeItem(id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              data-testid="customer_checkout__element-order-total-price"
            >
              { (totalPrice || 0).toFixed(2).replace('.', ',')}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

CheckoutTable.propTypes = {
  props: PropTypes.shape().isRequired,
  totalPrice: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      urlImage: PropTypes.string.isRequired,
    }),
  ).isRequired,
  qty: PropTypes.objectOf(PropTypes.number).isRequired,
  removeItem: PropTypes.func.isRequired,
};
