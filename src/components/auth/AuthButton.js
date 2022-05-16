import { NavLink } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { MyVerticallyCenteredModal } from '../../shared/components/ui-components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged } from '../../store-redux/selectors';
import { logout } from '../../store-redux/actions';

function AuthButton({ className }) {
  const dispatch = useDispatch();
  const isLoggedUser = useSelector(getIsLogged);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleLogoutClick = async () => {
    dispatch(logout());
  };

  return isLoggedUser? (
    <Fragment>
      <div id='auth-button' className={className} onClick={handleShowModal}>
        Cerrar Sesión
      </div>

      { showModal &&
          <MyVerticallyCenteredModal 
            modalTitle="Cerrar sesión" 
            modalBody="¿Deseas cerrar sesión?" 
            onAccept={handleLogoutClick}
            onCloseModal={handleCloseModal}
          />
        }
    </Fragment>
  )
   : (
    <NavLink id='auth-button' className={className} to="/login" end>
      Iniciar Sesión
    </NavLink>
  );
}

export default AuthButton;
