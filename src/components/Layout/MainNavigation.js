import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useTokenContext } from '../../context/tokenContext';

const MainNavigation = () => {
  const { token } = useTokenContext();
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!token && 
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          }
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          {token &&
          <li>
            <button>Logout</button>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
