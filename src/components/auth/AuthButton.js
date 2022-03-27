import { NavLink } from 'react-router-dom';
import AuthService  from './AuthService';
import { useAuthContext } from './AuthContext';
import { Fragment, useState } from 'react';
import { MyVerticallyCenteredModal } from '../../shared/components/ui-components/Modal';

function AuthButton({ className }) {
  const { isLoggedUser, handleLogout: onLogout } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleLogoutClick = async () => {
    try {
      await AuthService.logout();
      onLogout();
    } catch (error) {
      console.error("Error: ", error);
    }
    await AuthService.logout();
    onLogout();
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
      Iniciar Sesiómn
    </NavLink>
  );
}

export default AuthButton;
