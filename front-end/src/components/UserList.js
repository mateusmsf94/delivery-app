import PropTypes from 'prop-types';

export default function UserList({ usersList, removeUser }) {
  const header = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];
  const ROUTE = 'admin_manage';

  return (
    <div className="w-4/5 mx-auto mt-4">
      <h3>Lista de usuários</h3>
      <table className="w-full border">
        <thead>
          <tr>
            { header.map((option, i) => (
              <th key={ i } className="font-normal text-xs p-2">{option}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center p-4 text-white font-semibold">
          {
            usersList.map(({ id, name, email, role }, i) => (
              <tr key={ i } className="m-2 border-b-8 border-white">
                <td
                  className="bg-lightgreen px-1 py-1 text-black border-r-1 border-l-1"
                  data-testid={ `${ROUTE}__element-user-table-item-number-${i}` }
                >
                  {i}
                </td>
                <td
                  className="bg-lightgray text-black font-normal"
                  data-testid={ `${ROUTE}__element-user-table-name-${i}` }
                >
                  {name}
                </td>
                <td
                  className="bg-darkgreen"
                  data-testid={ `${ROUTE}__element-user-table-email-${i}` }
                >
                  {email}
                </td>
                <td
                  className="bg-purple"
                  data-testid={ `${ROUTE}__element-user-table-role-${i}` }
                >
                  {role}
                </td>
                <td className="bg-blue">
                  <button
                    type="button"
                    data-testid={ `${ROUTE}__element-user-table-remove-${i}` }
                    onClick={ () => removeUser(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

UserList.propTypes = {
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeUser: PropTypes.func.isRequired,
};
