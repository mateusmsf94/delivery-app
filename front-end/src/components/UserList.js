import PropTypes from 'prop-types';

export default function UserList({ usersList, removeUser }) {
  const header = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];
  const ROUTE = 'admin_manage';

  return (
    <div>
      <h3>Lista de usuários</h3>
      <table>
        <thead>
          <tr>
            { header.map((option, i) => (
              <th key={ i } className="font-normal text-xs p-2">{option}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            usersList.map(({ id, name, email, role }, i) => (
              <tr key={ i }>
                <td
                  data-testid={ `${ROUTE}__element-user-table-item-number-${i}` }
                >
                  {i}
                </td>
                <td
                  data-testid={ `${ROUTE}__element-user-table-name-${i}` }
                >
                  {name}
                </td>
                <td
                  data-testid={ `${ROUTE}__element-user-table-email-${i}` }
                >
                  {email}
                </td>
                <td
                  data-testid={ `${ROUTE}__element-user-table-role-${i}` }
                >
                  {role}
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `${ROUTE}__element-user-table-remove-${i}` }
                    onClick={ removeUser(id) }
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
