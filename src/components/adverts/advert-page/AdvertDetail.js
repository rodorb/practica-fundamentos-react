import React, { Fragment, useState } from 'react';
import { Photo } from '../../layout/Photo';
import ButtonBootstrap from 'react-bootstrap/Button';
import { MyVerticallyCenteredModal } from '../../../shared/components/ui-components/Modal';
import AdvertsService from '../service/AdvertsService';
import {  useNavigate } from 'react-router-dom';
import './AdvertDetails.css'
import defaultPhoto from '../../../assets/photo-not-found.jpg';

export const AdvertDetail = ({  name, sale, price, tags, photo, id }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const deleteAdvert = async()=>{

    let errorValue = null;
    let redirectTo;
    setIsLoading(true);
    try {
      await AdvertsService.deleteAdvert(id)
      redirectTo =  '/';
    } catch (error) {
      errorValue = error;
    }finally{
      setIsLoading(false);
      if(errorValue){
          setError(errorValue);
      }else{
          redirectTo && navigate(redirectTo, { replace: true }); 
      }  
    }
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
        <div>
          ...Loading - TODO: Spinner should be shown here
        </div>
      )}

      {error && (
        <div onClick={setError(null)} className="loginPage-error">
          {error.message} - TODO: An error notification should be shown here
        </div>
      )}
    </Fragment>
  );
};