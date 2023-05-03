import { useHistory } from 'react-router-dom';
import NavCustomer from '../components/NavCustomer';

export default function Products() {
  const history = useHistory();

  const useNavBar = () => {
    if (history.path === '/customer/products') {
      return (<NavCustomer />);
    }
    // if (history.path === '/customer/products') {
    // }
  };

  return (
    <>
      {useNavBar()}
    </>
  );
}
