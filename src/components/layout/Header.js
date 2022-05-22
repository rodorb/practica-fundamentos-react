import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

// import { ReactComponent as Icon } from '../../assets/twitter.svg';
// import AuthButton from '../auth/AuthButton';

import './Header.css';
import AuthButton from '../auth/AuthButton';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store-redux/selectors';
export const Header = ({ className }) => {
  const isLoggedUser = useSelector(getIsLogged);
    return (
        <header className={classNames('header', className)}>
          <Link className="react-link" to="/">
            <div className="header-logo">
              NodePop<span>React</span>
            </div>
          </Link>
         { isLoggedUser && <nav className="header-nav">
            <NavLink className={classNames('react-link', 'custom-nav-link')}
              to="/adverts"
              end
            >
              Todos los anuncios
            </NavLink>

            <NavLink className={classNames('react-link', 'custom-nav-link')}
              to="/adverts/new"             
            >
              Crear anuncio
            </NavLink>
            <AuthButton className={classNames('react-link', 'custom-nav-link')} />
          </nav>}
        </header>
      );
}