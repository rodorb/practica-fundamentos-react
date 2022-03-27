import React, { Fragment, useState } from 'react';
import { Photo } from '../../layout/Photo';
import ButtonBootstrap from 'react-bootstrap/Button';
import { MyVerticallyCenteredModal } from '../../../shared/components/ui-components/Modal';
import AdvertsService from '../service/AdvertsService';
import {  useNavigate } from 'react-router-dom';

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
      <article className="advert bordered">
        <div className="left">
          <Photo src={photo} className="advert-photo" />
        </div>
        <div className="right">
          <div className="advert-header">
            <p className="advert-name">{name}</p>
            <p className="advert-price">{price}</p>
            <p className="advert-sale">{sale? 'En venta': 'Se compra'}</p>
          </div>
          <ul>
              {tags.map((tag, index)=>{
                  return <li key={`${tag}-${index}`}>{tag}</li>
              })}
          </ul>
        </div>
        <ButtonBootstrap variant="primary" onClick={handleShowModal}>
          Borrar anuncio
        </ButtonBootstrap>
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