import React, { Fragment, useState } from 'react';
import { Photo } from '../../layout/Photo';
import ButtonBootstrap from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { MyVerticallyCenteredModal } from '../../../shared/components/ui-components/Modal';
import './AdvertDetails.css'
import defaultPhoto from '../../../assets/photo-not-found.jpg';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../../store-redux/selectors';
import { advertDeletion, uiResetError } from '../../../store-redux/actions';


export const AdvertDetail = ({  name, sale, price, tags, photo, id }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector(getUi);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const deleteAdvert = ()=>{
      dispatch(advertDeletion(id));
  }
  return (
    <Fragment>
      <article className='ad-detail'>
        <div className='left'>
            <div>
              <Photo src={photo? photo: defaultPhoto}/>
            </div>
            <div className='ad-container'>
                <h1 className="ad-name">{name}</h1>
                <p className="ad-sale">{sale? 'En venta': 'Se compra'}</p>
                <p className="ad-price">{price}€</p>
                <span>Etiquetas:</span>
                <ul>
                  {tags.map((tag, index)=>{
                      return <li key={`${tag}-${index}`}>{tag}</li>
                  })}
                </ul>
              
            </div>
        </div>
        
        <div className="delete-button">
          <ButtonBootstrap size='lg' variant="primary" onClick={handleShowModal}>
            Borrar anuncio
          </ButtonBootstrap>
        </div>
        
        { showModal &&
          <MyVerticallyCenteredModal 
          modalTitle="Borrar anuncio" 
          modalBody="¿Estás seguro de que deseas borrar el anuncio?" 
          onAccept={deleteAdvert}
          onCloseModal={handleCloseModal}
          />
        }
        
      </article>
      {isLoading && (
       <Spinner animation="border" role="status" variant="warning" >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {error && (
        <Toast bg="danger" onClose={() => dispatch(uiResetError())}>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Se ha producido un error en la aplicación.</Toast.Body>
      </Toast>
      )}
    </Fragment>
  );
};