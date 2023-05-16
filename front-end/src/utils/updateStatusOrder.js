// import { useHistory } from 'react-router-dom';

// const history = useHistory();

// async function updateStatusOrder(status) {
//   try {
//     const pathName = history.location.pathname;

//     const id = `${pathName.charAt(pathName.length - 1)}`;
//     const response = await fetch('http://localhost:3001/sales/', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id, status }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Response from server:', data);
//     } else {
//       const errorData = await response.json();
//       console.error(errorData);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// export default updateStatusOrder;
