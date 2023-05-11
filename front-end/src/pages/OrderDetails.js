import NavCustomer from '../components/NavCustomer';
// import formateDate from '../utils/formateDate';

export default function OrderDetails() {
  const header = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];
  const ROUTE = 'customer_order_details';
  // const orderFix = 4;

  return (
    <>
      <NavCustomer />
      <div className="w-4/5 mx-auto mt-4">
        <span>Detalhes do Pedido</span>
        <div>
          <p>
            PEDIDO
            <span
              data-testid={ `${ROUTE}__element-order-details-label-order-id` }
            >
              {/* { (order.id).toString().padStart(orderFix, '0') } */}
            </span>
          </p>
          <p>
            P. Vend:
            <span data-testid={ `${ROUTE}__element-order-details-label-seller-name` }>
              {}
            </span>
          </p>
          <p data-testid={ `${ROUTE}__element-order-details-label-order-date` }>
            {/* { formateDate() } */}
          </p>
          <p data-testid={ `${ROUTE}__element-order-details-label-delivery-status` }>
            { }
          </p>
          <button
            type="button"
            className="bg-darkgreen rounded px-1 text-white text-sm"
            data-testid={ `${ROUTE}__button-delivery-check` }
            onClick={ () => console.log('oi') }
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      </div>
      <table className="w-4/5 border mx-auto mt-2">
        <thead>
          <tr>
            { header.map((option, i) => (
              <th key={ i } className="font-normal text-xs p-2">{option}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center p-4 text-white font-semibold">
          { ([]).map(({ id, name, price }, index) => (
            <tr key={ index } className="m-2 border-b-8 border-white">
              <td
                className={ `bg-lightgreen px-1 py-1 text-black border-r-1
                border-l-1 rounded-tl-md rounded-bl-md` }
                data-testid={
                  `${ROUTE}__element-order-table-item-number-${index}`
                }
              >
                { index + 1}
              </td>
              <td
                className="bg-lightgray text-black font-normal"
                data-testid={ `${ROUTE}__element-order-table-name-${index}` }
              >
                { name }
              </td>
              <td className="bg-darkgreen">
                <span
                  data-testid={
                    `${ROUTE}__element-order-table-quantity-${index}`
                  }
                >
                  { qty[id] }
                </span>
              </td>
              <td className="bg-purple">
                {'R$ '}
                <span
                  data-testid={
                    `${ROUTE}__element-order-table-unit-price-${index}`
                  }
                >
                  { price.toString().replace('.', ',') }
                </span>
              </td>
              <td className="bg-blue">
                {'R$ '}
                <span
                  data-testid={
                    `${ROUTE}__element-order-table-sub-total-${index}`
                  }
                >
                  { (qty[id] * price).toFixed(2).replace('.', ',') }
                </span>
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
              data-testid={ `${ROUTE}__element-order-total-price` }
            >
              { (0).toFixed(2).replace('.', ',')}
            </span>
          </td>
        </tfoot>
      </table>
    </>
  );
}
