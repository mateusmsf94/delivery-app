import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Login() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    function redirectByRoel(role) {
      switch (role) {
      case 'customer':
        history.push('/customer/products');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      default:
        console.log('Error');
        break;
      }
    }

    if (user && user.token) {
      fetch('http://localhost:3001/login/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            redirectByRoel(user.role);
          } else {
            console.log('Token is invalid or expired');
            // Clear the invalid token from localStorage
            localStorage.removeItem('user');
          }
        })
        .catch((err) => {
          console.log('An error occurred:', err);
        });
    }
  }, [history]);

  return (
    <div className="flex justify-center mt-16">
      <LoginForm />
    </div>
  );
}

export default Login;
