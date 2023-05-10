import PropTypes from 'prop-types';
// import { useEffect } from 'react';

export default function CheckoutTable({ props }) {
  const { totalPrice, qty, removeItem, products } = props;

  const header = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item',
  ];

  if (!products || !qty || !products) {
    return null;
  }

  return (
    <div className="w-4/5 mx-auto mt-4">
      <h3 className="font-semibold">Finalizar Pedido</h3>
      <table className="w-full border">
        <thead>
          <tr>
            { header.map((option, i) => (
              <th key={ i } className="font-normal text-xs p-2">{option}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center p-4 text-white font-semibold">
          { (products).map(({ id, name, price }, index) => (
            // { border-b-8 border-white }
            <tr key={ index } className="m-2 border-b-8 border-white">
              <td
                className={ `bg-lightgreen px-1 py-1 text-black border-r-1
                border-l-1 rounded-tl-md rounded-bl-md` }
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1}
              </td>
              <td
                className="bg-lightgray text-black font-normal"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { name }
              </td>
              <td className="bg-darkgreen">
                <span
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { qty[id] }
                </span>
              </td>
              <td className="bg-purple">
                {'R$ '}
                <span
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { price.toString().replace('.', ',') }
                </span>
              </td>
              <td className="bg-blue">
                {'R$ '}
                <span
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { (qty[id] * price).toFixed(2).replace('.', ',') }
                </span>
              </td>
              <td
                className="bg-lightgreen"
              >
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
          <td
            className="w-full text-right pr-4 font-bold text-white bg-darkgreen"
            colSpan="6"
          >
            {'Total: R$ '}
            <span
              data-testid="customer_checkout__element-order-total-price"
            >
              { (totalPrice || 0).toFixed(2).replace('.', ',')}
            </span>
          </td>
        </tfoot>
      </table>
    </div>
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
