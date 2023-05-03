import { useLocation, Link } from 'react-router-dom';

function AuthHeader() {
  const location = useLocation();

  let title;

  // Check if the current path matches a login or register path
  if (location.pathname === '/login') {
    title = 'Log in';
  } else if (location.pathname === '/register') {
    title = 'Register';
  }

  return (
    <header>
      {title ? (
        <h1 className="text-3xl font-semibold text-center text-green-800 underline">
          {title}
        </h1>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default AuthHeader;
